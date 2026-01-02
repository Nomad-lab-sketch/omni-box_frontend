/**
 *  Базовый класс ошибки приложения.
 *  Создан для свертывания различных по составу полей объектов ошибок в унифицированную структуру.
 *
 *  @publicApi
 */
export class SysAppError {
  /**
   *  Наименование класса объекта ошибки.
   *  @name _name
   *  @type {string}
   *  @defaultValue `'SysAppError'`
   */
  protected _name = 'SysAppError';

  /**
   *  Текст ошибки.
   *  @name _message
   *  @type {string}
   */
  protected _message?: string;

  /**
   *  Стэк-трэйс ошибки.
   *  @name _stackTrace
   *  @type {string}
   */
  protected _stackTrace!: string;

  /**
   *  Оригинальный объект ошибки произвольного типа (больше для отладки).
   *  @name _origin
   *  @type {any}
   */
  protected _origin: any;

  /**
   *  Флаг определяющий фатальна ли ошибка.
   *  @name _isFatal
   *  @type {boolean}
   */
  protected _isFatal!: boolean;

  constructor(message?: string) {
    this._message = message;
  }

  /**
   * Возвращает наименование класса ошибки.
   * @public
   * @return {string} - наименование класса ошибки.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Устанавливает наименование класса ошибки.
   * @public
   * @param {string} value - строка с наименованием класса ошибки.
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Возвращает текст ошибки.
   * @public
   * @return {string} - текст ошибки.
   */
  get message(): string | undefined {
    return this._message;
  }

  /**
   * Устанавливает текст ошибки.
   * @public
   * @param {string} value - строка с текстом ошибки.
   */
  set message(value: string) {
    this._message = value;
  }

  /**
   * Возвращает стэк-трэйс ошибки.
   * @public
   * @return - стэк-трэйс ошибки.
   */
  get stackTrace(): string {
    return this._stackTrace;
  }

  /**
   * Устанавливает стэк-трэйс ошибки.
   * @public
   * @param {string} value - строка стэк-трэйса ошибки.
   */
  set stackTrace(value: string) {
    this._stackTrace = value;
  }

  /**
   * Возвращает оригинальный объект ошибки произвольного типа.
   * @public
   * @return {any} - оригинальный объект ошибки произвольного типа.
   */
  get origin(): any {
    return this._origin;
  }

  /**
   * Устанавливает оригинальный нетипизированный объект ошибки.
   * @public
   * @param {any} value - объект ошибки произвольного типа и структуры.
   */
  set origin(value: any) {
    this._origin = value;
  }

  /**
   * Возвращает признак фатальности ошибки.
   * @public
   * @return {boolean}
   */
  get isFatal(): boolean {
    return this._isFatal;
  }

  /**
   * Устанавливает признак фатальности ошибки.
   * @public
   * @param {boolean} value
   */
  set isFatal(value: boolean) {
    this._isFatal = value;
  }
}
