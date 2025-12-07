import { RouterPaths } from '@omni-box/sys-shared';
import * as React from 'react';
import { RouteObject } from 'react-router-dom';

export const mainRoute: RouteObject = {
  path: RouterPaths.MAIN,
  Component: MainComponent,
};

function MainComponent(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className="text-7xl opacity-40">OMNI_BOX</span>
    </div>
  );
}
