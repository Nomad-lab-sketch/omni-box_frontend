import { OmniLayoutComponent, RouterPaths, TOKEN } from '@omni-box/sys-shared';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
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

const router = createBrowserRouter([
  {
    path: RouterPaths.MAIN,
    Component: () => {
      return (
        <ConfigProvider theme={themeConfig}>
          <OmniLayoutComponent />
        </ConfigProvider>
      );
    },
    children: [mainRoute, todoListRoute],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
