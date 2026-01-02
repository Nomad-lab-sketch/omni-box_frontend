import { SysHttpError } from './sys-http-error';

/**
 * Контракт реактивного состояния данных, ошибок и загрузки.
 * Используется в `SysDataSource` и может быть реализован для других типов `DataState`.
 *
 * @template T Тип данных, управляемых состоянием.
 */
export interface SysDataStateContract<T = unknown> {
  /** Текущее значение данных как `computed` сигнал */
  get value(): T | null;

  /** Установить значение данных */
  set value(data: T | null);

  /** Состояние загрузки */
  get loading(): boolean;

  /** Установить состояние загрузки */
  set loading(loading: boolean);

  /** Ошибка загрузки */
  get error(): SysHttpError | null;

  /** Установить ошибку */
  set error(error: SysHttpError | null);

  /** Сбросить состояние до дефолтного */
  reset(): void;

  /** Высвобождение ресурсов, завершение стримов и очистка состояния */
  destroy(): void;
}
