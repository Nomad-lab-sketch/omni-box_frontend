import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { type RouterItem } from '../../model/router-item';

interface OmniLayoutProps {
  routes: RouterItem[];
}

export function OmniLayoutComponent(props: OmniLayoutProps): React.JSX.Element {
  return (
    <div>
      <div className="flex items-start gap-8">
        {props.routes.map((item) => (
          <div key={item.path}>{item.label} </div>
        ))}
      </div>
      <div className="h-full">
        <Outlet />
      </div>
      <div className="bg-gray-300">
        <span className="text-2xl">OMNI_BOX</span>
      </div>
    </div>
  );
}
