import { createContext, ReactNode } from 'react';

import { SysCoreConfig } from './config/sys-core-config';
import { ErrorEventBridge } from './lib/sys-error-event-bridge';
import { SysErrorBoundary } from './sys-error-boundary';

const SysCoreConfigContext = createContext(
  new SysCoreConfig({ env: null, goBackRoute: undefined, errorRoute: undefined })
);

/**
 * Основной компонент ядра sys-core. Является точкой входа для инициализации системных функций,
 * таких как перехват глобальных ошибок через ErrorEventBridge.
 */
export function SysCore({ children, sysCoreConfig }: { children: ReactNode; sysCoreConfig: SysCoreConfig }) {
  new ErrorEventBridge(sysCoreConfig);

  return <SysCoreConfigContext.Provider value={sysCoreConfig}>{children}</SysCoreConfigContext.Provider>;

  return (
    <SysErrorBoundary>
      <SysCoreConfigContext.Provider value={sysCoreConfig}>{children}</SysCoreConfigContext.Provider>
    </SysErrorBoundary>
  );
}

export default SysCore;
