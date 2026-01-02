import {
  FetchFn,
  FetchFnParams,
  SysDataSourceContract,
  SysDataSourceOptions,
  UseSyncExternalStore,
} from '../../model/sys-data-source-contract';
import { SysHttpDispatcher } from '../sys-http-dispatcher';
import { SysDataStateContract } from './../../model/sys-data-state-contract';
import { SysDataState } from './sys-data-state';

export class SysDataSource<T = unknown> implements SysDataSourceContract<T> {
  /** Внутреннее состояние данных */
  private readonly _state = new SysDataState<T>();

  /**
   * Функция, вызываемая при необходимости загрузки данных.
   * Принимает параметры запроса и возвращает Observable с результатом.
   */
  private readonly _fetchFn: FetchFn<T>;

  /**
   * Опции DataSource.
   */
  private readonly _options: SysDataSourceOptions<T>;

  /**
   * Возвращает options.
   *
   * @returns SysDataSourceOptions.
   */
  public get options(): SysDataSourceOptions<T> | undefined {
    return this._options;
  }

  /**
   * Последние параметры с которыми был выполнен запрос.
   */
  private _lastParams?: FetchFnParams;

  /**
   * Флаг определяющий есть ли кешированные данные.
   */
  private _hasCache = false;

  /**
   * Таймер для автообновления данных по интервалу.
   */
  private _refreshIntervalTimer: ReturnType<typeof setInterval> | null = null;

  /** Список слушателей изменений состояния данных */
  public listeners: Parameters<UseSyncExternalStore<SysDataStateContract<T>>['subscribe']>[0][] = [];

  public _snapshot: Omit<SysDataStateContract<T>, 'reset' | 'destroy'> = {
    value: this._state.value,
    loading: this._state.loading,
    error: this._state.error,
  };

  /**
   * Конструктор источника данных.
   *
   * @param fetchFn Функция для асинхронной загрузки данных, принимающая параметры запроса.
   * @param options
   */
  constructor(fetchFn: FetchFn<T>, options: SysDataSourceOptions<T> = {}) {
    this._fetchFn = fetchFn;
    this._options = options;

    if (options?.autoLoad) {
      this.load(options?.params);
    }

    this._startRefreshTimer();
  }

  /**
   * Получает текущий снимок состояния данных.
   * @returns Текущее состояние данных без методов reset и destroy.
   */
  public getSnapshot(): Omit<SysDataStateContract<T>, 'reset' | 'destroy'> {
    return this._snapshot;
  }

  /**
   * Подписывается на изменения состояния данных.
   * @param onStoreChange Слушатель изменений состояния данных.
   * @returns Функция для отмены подписки.
   */
  public subscribe(onStoreChange: () => void): () => void {
    this.listeners.push(onStoreChange);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== onStoreChange);
    };
  }

  /**
   * Загружает данные с использованием `fetchFn`, обновляя сигналы `value`, `loading` и `error`.
   *
   * - Если переданы параметры `params`, кэш сбрасывается перед загрузкой.
   * - Если включён `cache` и есть закэшированные данные, возвращается кэш.
   * - При наличии `refreshInterval`, текущий таймер автообновления сбрасывается и запускается заново.
   *
   * @param params Необязательные параметры запроса, передаваемые в `fetchFn`.
   * @returns Промис с загруженными данными или `null`, если данных нет.
   * @throws Ошибка, если загрузка завершилась неудачей. Значение также устанавливается в `error`.
   */
  public async load(params?: FetchFnParams): Promise<T | null> {
    if (params) this.invalidateCache();

    if (this._options.cache && this._hasCache && this._state.value) {
      return this._state.value;
    }

    this._stopRefreshTimer();

    this._state.loading = true;
    this._state.error = null;
    this._lastParams = params;

    try {
      const data = await this._fetchFn(this._lastParams);
      this._hasCache = true;
      this._state.value = data;
      this._options.onSuccess?.(data, this);
      return data;
    } catch (error: any) {
      const handled = SysHttpDispatcher.handleHttpError(error);
      this._state.error = handled;
      this._options.onError?.(handled, this);
      throw handled;
    } finally {
      this._state.loading = false;
      this._startRefreshTimer();
      this.emitChange();
    }
  }

  /**
   * Оповещает всех подписчиков об изменении состояния данных.
   * @returns void
   */
  public emitChange(): void {
    this._snapshot = {
      value: this._state.value,
      loading: this._state.loading,
      error: this._state.error,
    };

    this.listeners.forEach((listener: () => void): void => listener());
  }

  /**
   * Только сброс кэша, без сброса value/error.
   */
  public invalidateCache(): void {
    this._hasCache = false;
  }

  /**
   * Загружает данные с использованием `load` используя последние переданные параметры _lastParams.
   *
   * @returns Промис с загруженными данными.
   * @throws Ошибка, если загрузка завершилась неудачей.
   */
  public reload(): Promise<T | null> {
    return this.load();
  }

  /**
   * Очищает интервал если был передан в options.refreshInterval
   */
  public stopAutoRefresh(): void {
    this._stopRefreshTimer();
  }

  /**
   * Запускает или перезапускает таймер автообновления данных,
   * если указаны `refreshInterval` и включён `autoLoad`.
   *
   * При каждом срабатывании таймера вызывается метод `load()`.
   * Если таймер уже запущен, он сначала останавливается.
   */
  private _startRefreshTimer() {
    if (this._refreshIntervalTimer) clearInterval(this._refreshIntervalTimer);

    if (this._options.refreshInterval && this._options.autoLoad) {
      this._refreshIntervalTimer = setInterval(() => {
        this.invalidateCache();
        this.load();
      }, this._options.refreshInterval);
    }
  }

  /**
   * Останавливает таймер автообновления данных, если он активен.
   * Вызывается перед ручной загрузкой или уничтожением компонента.
   */
  private _stopRefreshTimer() {
    if (this._refreshIntervalTimer) {
      clearInterval(this._refreshIntervalTimer);
      this._refreshIntervalTimer = null;
    }
  }

  /**
   * Сбрасывает все внутренние состояния:
   * - данные (`value`) обнуляются;
   * - ошибка (`error`) очищается;
   * - флаг загрузки (`loading`) устанавливается в `false`;
   * - кэш сбрасывается.
   * - Список слушателей очищается.
   */
  public resetData(): void {
    this._state.reset();
    this._hasCache = false;
    this.listeners = [];
    this.emitChange();
  }

  /**
   * Необходимо вызывать при destroy компонента что бы избежать утечек памяти.
   */
  public destroy() {
    this.stopAutoRefresh();
    this._state.destroy();
    this._lastParams = undefined;
    this._hasCache = false;
    this.listeners = [];
  }
}
