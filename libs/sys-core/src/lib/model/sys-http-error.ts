import { SysAppError } from './sys-app-error';

/**
 * Класс ошибки HTTP-запроса.
 * Используется для приведения всех видов HTTP-ошибок к единому формату.
 * Предоставляет дополнительную информацию, такую как тело ошибки, URL и временная метка.
 *
 * @publicApi
 */
export class SysHttpError extends SysAppError {
  /** HTTP-статус код (например, 404, 500) */
  private _status!: number;

  /** Текст статуса (например, "Not Found", "Internal Server Error") */
  private _statusText!: string;

  /** URL, по которому был сделан запрос */
  private _url?: string;

  /** Содержимое тела ответа с ошибкой */
  private _errorBody?: any;

  /** Временная метка, когда произошла ошибка */
  private _timestamp: Date = new Date();

  constructor() {
    super();
    this._name = 'SysHttpError';
  }

  /** HTTP-статус ошибки */
  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  /** HTTP-статус в виде строки */
  get statusText(): string {
    return this._statusText;
  }

  set statusText(value: string) {
    this._statusText = value;
  }

  /** URL, на который был выполнен запрос */
  get url(): string | undefined {
    return this._url;
  }

  set url(value: string | undefined) {
    this._url = value;
  }

  /** Тело ошибки, если оно присутствует в ответе */
  get errorBody(): any {
    return this._errorBody;
  }

  set errorBody(value: any) {
    this._errorBody = value;
  }

  /** Временная метка ошибки */
  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  /**
   * Определяет, является ли ошибка клиентской (4xx).
   * @returns `true`, если код ошибки от 400 до 499.
   */
  public isClientError(): boolean {
    return this._status >= 400 && this._status < 500;
  }

  /**
   * Определяет, является ли ошибка серверной (5xx).
   * @returns `true`, если код ошибки от 500 до 599.
   */
  public isServerError(): boolean {
    return this._status >= 500 && this._status < 600;
  }

  /**
   * Возвращает краткое строковое представление ошибки.
   * @returns Строка вида `[404] Not Found — /some/url`
   */
  public override toString(): string {
    return `[${this._status}] ${this._statusText} — ${this._url ?? 'unknown URL'}`;
  }
}
