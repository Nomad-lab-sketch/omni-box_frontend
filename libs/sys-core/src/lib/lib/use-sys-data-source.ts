import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

import { FetchFn, SysDataSourceOptions } from '../model/sys-data-source-contract';
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
export function useSysDataSourceWithLifecycle<T = unknown>(_fetchFn: FetchFn<T>, _options?: SysDataSourceOptions<T>) {
  const dataSourceRef = useRef<SysDataSource<T> | null>(null);

  if (!dataSourceRef.current) {
    dataSourceRef.current = new SysDataSource<T>(_fetchFn, _options);
  }

  const sysDataSource = dataSourceRef.current;

  const dataSource = useSyncExternalStore(
    sysDataSource.subscribe.bind(sysDataSource),
    sysDataSource.getSnapshot.bind(sysDataSource)
  );

  // Очистка ресурса при размонтировании компонента
  useEffect(() => {
    return () => {
      sysDataSource.destroy();
    };
  }, [sysDataSource]);

  return { dataSource, sysDataSource };
}
