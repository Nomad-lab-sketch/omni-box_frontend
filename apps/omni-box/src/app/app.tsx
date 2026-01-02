import { SysCoreConfig } from '@omni-box/sys-core';
import { OmniLayoutComponent, RouterPaths, TOKEN } from '@omni-box/sys-shared';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { mainRoute } from './main/main.component';
import { todoListRoute } from './todo-list/todo-list.component';

const themeConfig: ThemeConfig = {
  token: TOKEN,
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  components: {
    Layout: {
      triggerBg: TOKEN.colorBgContainer,
      siderBg: TOKEN.colorBgBase,
      headerBg: TOKEN.colorBgBase,
    },

    Menu: {
      darkItemBg: TOKEN.colorBgBase,
      darkSubMenuItemBg: TOKEN.colorBgContainer,
      subMenuItemBg: TOKEN.colorBgContainer,
    },
  },
};

const env = {
  buildTarget: import.meta.env.VITE_APP_BUILD_TARGET,
  backend: {
    api: import.meta.env.VITE_BACKEND_API_URL,
  },
};

const sysCoreConfig = new SysCoreConfig({
  env: env,
  goBackRoute: import.meta.env.VITE_BACK_ROUTE,
  errorRoute: import.meta.env.VITE_ERROR_ROUTE,
});

const SysCoreConfigContext = createContext(sysCoreConfig);

const router = createBrowserRouter([
  {
    path: RouterPaths.MAIN,
    Component: () => {
      return (
        <SysCoreConfigContext.Provider value={sysCoreConfig}>
          <ConfigProvider theme={themeConfig}>
            <OmniLayoutComponent />
          </ConfigProvider>
        </SysCoreConfigContext.Provider>
      );
    },
    children: [mainRoute, todoListRoute],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
