import { SysDataStateContract } from '../../model/sys-data-state-contract';
import { SysHttpError } from '../../model/sys-http-error';

/**
 * Класс, управляющий реактивным состоянием данных, ошибок и загрузки.
 * Используется внутри `SysDataSource`, но может быть переиспользован и отдельно.
 *
 * @publicApi
 */
export class SysDataState<T = unknown> implements SysDataStateContract<T> {
  private _value: T | null = null;
  private _loading = false;
  private _error: SysHttpError | null = null;

  /** Текущее значение данных */
  public get value(): T | null {
    return this._value;
  }

  /** Установить значение */
  public set value(data: T | null) {
    this._value = data;
  }

  /** Флаг загрузки */
  public get loading(): boolean {
    return this._loading;
  }

  /** Установить флаг загрузки */
  public set loading(loading: boolean) {
    this._loading = loading;
  }

  /** Последняя ошибка загрузки */
  public get error(): SysHttpError | null {
    return this._error;
  }

  /** Установить ошибку */
  public set error(error: SysHttpError | null) {
    this._error = error;
  }

  /** Сброс всех состояний */
  public reset(): void {
    this.value = null;
    this.error = null;
    this.loading = false;
  }

  /** Высвобождает память сбрасывая состояние к исходному и завершая все subject */
  public destroy(): void {
    this.reset();
  }
}
