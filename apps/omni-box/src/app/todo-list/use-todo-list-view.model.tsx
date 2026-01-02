import { useSysDataSourceWithLifecycle, ViewModelContract } from '@omni-box/sys-core';
import { TableProps, Tag } from 'antd';

import { TodoListDTO } from './dto/todo-list.dto';

export interface UseTodoListViewModelState {
  column_config: TableProps<TodoListDTO>['columns'];
  table_data: TodoListDTO[];
}

const column_config: TableProps<TodoListDTO>['columns'] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Задача',
  },
  {
    key: 'tags',
    dataIndex: 'tags',
    title: 'Теги',
    render: (_, { id, tags }) => {
      return (
        <div className="flex gap-1">
          {tags.map((t) => (
            <Tag key={id + t}>{t}</Tag>
          ))}
        </div>
      );
    },
  },
];

const table_data: TodoListDTO[] = [
  {
    id: crypto.randomUUID(),
    name: 'Задача 1',
    tags: ['1', '2'],
  },
  {
    id: crypto.randomUUID(),
    name: 'Задача 2',
    tags: ['1', '2'],
  },
];

export function useTodoListViewModel(): ViewModelContract<UseTodoListViewModelState> {
  const data = useSysDataSourceWithLifecycle<TodoListDTO[]>((params) => Promise.resolve<TodoListDTO[]>(table_data), {
    autoLoad: true,
  });

  console.log(data);

  return {
    state: {
      column_config,
      table_data: data.value || [],
    },
    action: {},
  };
}
