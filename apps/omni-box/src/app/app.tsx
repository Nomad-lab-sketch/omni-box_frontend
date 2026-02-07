import { SysCoreConfig } from '@omni-box/sys-core';
import { OmniLayoutComponent, ROUTER_PATH_LABELS, RouterItem, RouterPaths } from '@omni-box/sys-shared';
import { createContext } from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

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

const SysCoreConfigContext = createContext(sysCoreConfig);

const items: RouterItem[] = [
  {
    path: `/${RouterPaths.TODO_LIST}`,
    label: (
      <Link className="text-blue-600" to={RouterPaths.TODO_LIST}>
        {ROUTER_PATH_LABELS['todo-list']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.HELL_HOUND}`,
    label: (
      <Link className="text-blue-600" to={RouterPaths.HELL_HOUND}>
        {ROUTER_PATH_LABELS['hell-hound']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.AAMN}`,
    label: (
      <Link className="text-blue-600" to={RouterPaths.AAMN}>
        {ROUTER_PATH_LABELS['aamn']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.FRAMEWORK}`,
    label: (
      <Link className="text-blue-600" to={RouterPaths.FRAMEWORK}>
        {ROUTER_PATH_LABELS['framework']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.DRAW}`,
    label: (
      <Link className="text-blue-600" to={RouterPaths.DRAW}>
        {ROUTER_PATH_LABELS['draw']}
      </Link>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: RouterPaths.MAIN,
    Component: () => {
      return (
        <SysCoreConfigContext.Provider value={sysCoreConfig}>
          <OmniLayoutComponent routes={items} />
        </SysCoreConfigContext.Provider>
      );
    },
    children: [mainRoute],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
