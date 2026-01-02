import { useSyncExternalStore } from 'react';

import { SysDataStateContract } from './sys-data-state-contract';
import { SysHttpError } from './sys-http-error';

/**
 * Тип функции для загрузки данных.
 *
 * @template T Тип возвращаемых данных.
 * @param params Дополнительные параметры запроса (например, query params).
 * @returns Observable с загружаемыми данными.
 * @publicApi
 */
export type FetchFn<T = unknown> = (params?: FetchFnParams) => Promise<T>;
export type FetchFnParams<T = unknown> = { params?: Record<string, unknown>; body?: T };

/**
 * Тип параметров функции useSyncExternalStore из React.
 */
export interface UseSyncExternalStore<Snapshot> {
  subscribe: Parameters<typeof useSyncExternalStore<Snapshot>>[0];
  getSnapshot: Parameters<typeof useSyncExternalStore<Snapshot>>[1];
  getServerSnapshot?: Parameters<typeof useSyncExternalStore<Snapshot>>[2];
}

/**
 * Интерфейс для источника данных, инкапсулирующего логику загрузки, хранения и управления состоянием асинхронных данных.
 *
 * Используется в компонентах, где требуется реактивная работа с данными, включая отображение состояния загрузки и ошибок.
 *
 * @template T Тип данных, которые загружает источник.
 */
export interface SysDataSourceContract<T = unknown>
  extends UseSyncExternalStore<Omit<SysDataStateContract<T>, 'reset' | 'destroy'>> {
  /**
   * Актуальный снимок состояния источника данных.
   *
   * Используется для синхронизации с `useSyncExternalStore`
   * и представляет собой неизменяемое представление состояния
   * (`value`, `loading`, `error`) без методов управления жизненным циклом.
   *
   * Обновляется при каждом изменении состояния и
   * используется для определения необходимости уведомления подписчиков.
   */
  _snapshot: Omit<SysDataStateContract<T>, 'reset' | 'destroy'>;

  /**
   * Список слушателей изменений состояния данных.
   */
  listeners: Parameters<UseSyncExternalStore<SysDataStateContract<T>>['subscribe']>[0][];

  /**
   * Загружает данные с использованием указанной функции загрузки (`fetchFn`), передавая в неё параметры запроса.
   *
   * @param params Параметры запроса (например, query параметры или тело запроса). Может быть `undefined`.
   * @returns Промис, разрешающийся с загруженными данными типа `T`.
   * @throws Ошибка, если загрузка не удалась. Также обновляет сигнал `error`.
   */
  load: (params?: FetchFnParams) => Promise<T | null>;

  /**
   * Сбрасывает состояние источника данных:
   * - обнуляет значение `value` (обычно в `null`);
   * - очищает `error`;
   * - может использоваться при повторной инициализации компонента или при сбросе формы.
   */
  resetData: () => void;
}

/**
 * Интерфейс опций источника данных, .
 *
 * @template T Тип данных, которые загружает источник.
 * @publicApi
 */
export interface SysDataSourceOptions<T = unknown> {
  /**
   * Загружать данные автоматически при создании источника.
   */
  autoLoad?: boolean;

  /**
   * params передается в случае если установлен autoLoad.
   */
  params?: FetchFnParams;

  /**
   * Включает кеширование: `load()` не будет делать запрос повторно, если данные уже загружены.
   */
  cache?: boolean;

  /**
   * Интервал автозагрузки в миллисекундах.
   * Если не указан, автообновление не выполняется.
   * Если установлен, `load()` будет вызываться каждые `n` миллисекунд.
   * При ручном вызове `load()` таймер сбрасывается и запускается заново.
   *
   * !WARNING! При передаче этого значения устанавливается интервал который необходимо очищать
   * что бы избежать утечек памяти!!!!
   */
  refreshInterval?: number;

  /**
   * Обработчик, вызываемый при успешной загрузке данных.
   */
  onSuccess?: (value: T, ctx: SysDataSourceContract<T>) => void;

  /**
   * Обработчик, вызываемый при ошибке загрузки.
   */
  onError?: (error: SysHttpError, ctx: SysDataSourceContract<T>) => void;
}
