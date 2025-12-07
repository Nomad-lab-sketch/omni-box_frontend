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

const sysCoreConfig = new SysCoreConfig({ env: '', goBackRoute: '/', errorRoute: '' });

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
