import axios, { AxiosError } from 'axios';

import { SysHttpError } from '../model/sys-http-error';

/**
 * HTTP-диспетчер для выполнения запросов к серверу с использованием axios.
 * Предоставляет статические методы для основных HTTP операций (GET, POST, PUT, DELETE, PATCH).
 *
 * @example
 * ```typescript
 * const data = await SysHttpDispatcher.get<User>('/api/users/1');
 * const newUser = await SysHttpDispatcher.post<User>('/api/users', { name: 'John' });
 * ```
 */
export class SysHttpDispatcher {
  /**
   * Выполняет GET-запрос к указанному URL.
   *
   * @template T - Тип данных ответа
   * @param {string} url - URL для запроса
   * @param {Record<string, string>} [headers] - Опциональные заголовки запроса
   * @returns {Promise<T>} Промис с данными ответа типа T
   *
   * @example
   * ```typescript
   * const user = await SysHttpDispatcher.get<User>('/api/users/1');
   * ```
   */
  public static async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await axios.get(url, { headers });
    return response.data;
  }

  /**
   * Выполняет POST-запрос к указанному URL.
   *
   * @template T - Тип данных ответа
   * @param {string} url - URL для запроса
   * @param {unknown} data - Данные для отправки в теле запроса
   * @param {Record<string, string>} [headers] - Опциональные заголовки запроса
   * @returns {Promise<T>} Промис с данными ответа типа T
   */
  public static async post<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await axios.post(url, data, { headers });
    return response.data;
  }

  /**
   * Выполняет PUT-запрос к указанному URL.
   *
   * @template T - Тип данных ответа
   * @param {string} url - URL для запроса
   * @param {unknown} data - Данные для отправки в теле запроса
   * @param {Record<string, string>} [headers] - Опциональные заголовки запроса
   * @returns {Promise<T>} Промис с данными ответа типа T
   */
  public static async put<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await axios.put(url, data, { headers });
    return response.data;
  }

  /**
   * Выполняет DELETE-запрос к указанному URL.
   *
   * @template T - Тип данных ответа
   * @param {string} url - URL для запроса
   * @param {Record<string, string>} [headers] - Опциональные заголовки запроса
   * @returns {Promise<T>} Промис с данными ответа типа T
   */
  public static async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await axios.delete(url, { headers });
    return response.data;
  }

  /**
   * Выполняет PATCH-запрос к указанному URL.
   *
   * @template T - Тип данных ответа
   * @param {string} url - URL для запроса
   * @param {unknown} data - Данные для отправки в теле запроса
   * @param {Record<string, string>} [headers] - Опциональные заголовки запроса
   * @returns {Promise<T>} Промис с данными ответа типа T
   */
  public static async patch<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await axios.patch(url, data, { headers });
    return response.data;
  }

  /**
   * Преобразует HTTP-респонс с ошибкой в унифицированную структуру SysHttpError.
   *
   * @param errorResponse - Ответ от сервера с ошибкой
   * @returns Экземпляр SysHttpError со всеми доступными данными
   */
  public static handleHttpError(errorResponse: AxiosError<unknown>): SysHttpError {
    const error = new SysHttpError();

    error.status = errorResponse.status ?? 0;
    error.statusText = errorResponse.message;
    error.url = (errorResponse as any)?.url ?? '';
    error.errorBody = (errorResponse as any)?.error ?? null;
    error.message = this.extractMessage(error.errorBody, error.statusText);
    error.stackTrace = new Error().stack || '';
    error.origin = errorResponse;

    return error;
  }

  /**
   * Извлекает текст сообщения из тела ошибки.
   *
   * @param body - Тело ошибки из респонса
   * @param fallback - Альтернативный текст, если в теле нет сообщения
   * @returns Извлечённое или резервное сообщение
   */
  private static extractMessage(body: unknown, fallback: string): string {
    if (body && typeof body === 'object') {
      if ('message' in body && typeof body.message === 'string') {
        return body.message;
      }
      if ('error' in body && typeof body.error === 'string') {
        return body.error;
      }
    }
    return fallback;
  }
}
