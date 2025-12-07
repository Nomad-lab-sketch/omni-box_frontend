import { RouterPaths } from '@omni-box/sys-shared';
import { Button, Input, Table } from 'antd';
import * as React from 'react';
import { RouteObject } from 'react-router-dom';

import { useTodoListViewModel } from './use-todo-list-view.model';

export const todoListRoute: RouteObject = {
  path: RouterPaths.TODO_LIST,
  Component: TodoListComponent,
};

function TodoListComponent(): React.JSX.Element {
  const { state } = useTodoListViewModel();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input placeholder="Поиск задач" />
        <Button type="primary">Найти</Button>
      </div>
      <Table rowKey="id" columns={state.column_config} dataSource={state.table_data} />
    </div>
  );
}
