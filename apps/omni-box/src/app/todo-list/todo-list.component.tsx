import { RouterPaths } from '@omni-box/sys-shared';
import * as React from 'react';
import { RouteObject } from 'react-router-dom';

export const todoListRoute: RouteObject = {
  path: RouterPaths.TODO_LIST,
  Component: TodoListComponent,
};

function TodoListComponent(): React.JSX.Element {
  return <div>Todo list page</div>;
}
