import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { ROUTER_PATH_LABELS, RouterPaths } from '../../const/router-path';

const { Header, Content, Footer, Sider } = Layout;

const items: Required<MenuProps>['items'][number][] = [
  {
    key: `/${RouterPaths.TODO_LIST}`,
    label: <Link to={RouterPaths.TODO_LIST}>Список задач</Link>,
    icon: <PieChartOutlined />,
  },
];

export function OmniLayoutComponent(): React.JSX.Element {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const breadCrumbItem: ItemType[] = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean); // Убираем пустую строку
    const items: ItemType[] = [];
    let currentPath = '';

    items.push({
      key: RouterPaths.MAIN,
      title: <Link to="/">Главная</Link>,
    });

    // Строим путь постепенно
    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      items.push({
        key: currentPath,
        title:
          index === paths.length - 1 ? (
            ROUTER_PATH_LABELS[path as RouterPaths] || path // Последний элемент без ссылки
          ) : (
            <Link to={currentPath}>{ROUTER_PATH_LABELS[path as RouterPaths] || path}</Link>
          ),
      });
    });

    return items;
  }, [location.pathname]); // Зависимость только от pathname

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link to={RouterPaths.MAIN}>
          <div className="text-white text-base h-14 flex items-center w-full text-center justify-center opacity-80">
            {collapsed ? 'O_B' : 'OMNI_BOX'}
          </div>
        </Link>
        <Menu theme="dark" items={items} selectedKeys={[location.pathname]} />
      </Sider>
      <Layout className='flex flex-col gap-2'>
        <Header className="p-0 pl-4 pr-4">
          <Button
            className="h-full text-base"
            type="text"
            size="large"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className="flex flex-col gap-5 m-0 ml-4 mr-4">
          <Breadcrumb className="pt-1 pb-1" items={breadCrumbItem} />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
