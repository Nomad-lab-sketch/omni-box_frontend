import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { FetchFn, SysDataSourceOptions } from '../model/sys-data-source-contract';
import { SysDataStateContract } from '../model/sys-data-state-contract';
import { SysDataSource } from './data-sources/sys-data-source';

/**
 * Хук для использования SysDataSource в компонентах React.
 *
 * @template T - Тип данных, с которыми работает DataSource
 * @param fetchFn  Функция для загрузки данных
 * @param options  Опции DataSource
 * @returns Текущее состояние DataSource
 */
export function useSysDataSource<T = unknown>(fetchFn: FetchFn<T>, options?: SysDataSourceOptions<T>) {
  const sysDataSource = useMemo(() => new SysDataSource<T>(fetchFn, options), [fetchFn, options]);

  const dataSource = useSyncExternalStore(
    sysDataSource.subscribe.bind(sysDataSource),
    sysDataSource.getSnapshot.bind(sysDataSource)
  );

  return { dataSource, sysDataSource };
}

/**
 * Хук для использования SysDataSource в компонентах React с автоматическим управлением жизненным циклом.
 * @template T - Тип данных, с которыми работает DataSource
 * @param fetchFn  Функция для загрузки данных
 * @param options  Опции DataSource
 * @returns Текущее состояние DataSource
 */
export function useSysDataSourceWithLifecycle<T = unknown>(fetchFn: FetchFn<T>, options?: SysDataSourceOptions<T>) {
  // Стабильная ссылка на опции, чтобы не пересоздавать/не спамить эффекты
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [sysDataSource] = useState(() => new SysDataSource<T>(fetchFn, options));

  const dataSource = useSyncExternalStore(
    sysDataSource.subscribe.bind(sysDataSource),
    sysDataSource.getSnapshot.bind(sysDataSource)
  );

  // Эффект для автозапуска
  useEffect(() => {
    if (optionsRef.current?.autoLoad) {
      sysDataSource.load(optionsRef.current?.params);
    }
  }, [sysDataSource]);

  // Эффект для очистки при размонтировании
  useEffect(() => {
    return () => {
      sysDataSource.destroy();
    };
  }, [sysDataSource]);

  return { dataSource, sysDataSource };
}

/**
 * Хук для выборки данных из SysDataSource с использованием селектора.
 * @param sysDataSource
 * @param selector
 * @returns
 */
export function useSysDataSourceSelector<T = unknown, Slice = unknown>(
  sysDataSource: SysDataSource<T>,
  selector: (snapshot: Omit<SysDataStateContract<T>, 'reset' | 'destroy'>) => Slice
): Slice {
  return useSyncExternalStore(
    sysDataSource.subscribe.bind(sysDataSource),
    () => selector(sysDataSource.getSnapshot()),
    // Серверный снимок (опционально для SSR)
    () => selector(sysDataSource.getSnapshot())
  );
}
