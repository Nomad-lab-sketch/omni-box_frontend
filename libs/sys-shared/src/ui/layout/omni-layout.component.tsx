import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { type RouterItem } from '../../model/router-item';

interface OmniLayoutProps {
  routes: RouterItem[];
}

export function OmniLayoutComponent(props: OmniLayoutProps): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Шапка с навигацией */}
      <div className="flex items-center gap-8 p-4 border-b border-gray-200 bg-white shadow-sm">
        {props.routes.map((item) => (
          <div key={item.path}>{item.linkElement}</div>
        ))}
      </div>

      {/* Основной контент - займет всё доступное пространство */}
      {/* Сделаем контейнер flex column, чтобы дочерние рендеры Outlet могли использовать flex:1 */}
      <div className="flex-grow p-4 md:p-6 flex flex-col min-h-0">
        <Outlet />
      </div>

      {/* Футер */}
      <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xl font-semibold">OMNI_BOX</span>
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}
