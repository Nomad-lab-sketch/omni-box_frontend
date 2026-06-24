import { omniBoxDrawRoute } from '@omni-box/draw';
import { SysCore, SysCoreConfig } from '@omni-box/sys-core';
import { OmniLayoutComponent, RouterPaths } from '@omni-box/sys-shared';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { appRoute } from './app.route';
import { mainRoute } from './main/main.component';

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

const router = createBrowserRouter([
  {
    path: RouterPaths.MAIN,
    Component: () => {
      return (
        <SysCore sysCoreConfig={sysCoreConfig}>
          <OmniLayoutComponent routes={appRoute} />
        </SysCore>
      );
    },
    children: [mainRoute, omniBoxDrawRoute],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
