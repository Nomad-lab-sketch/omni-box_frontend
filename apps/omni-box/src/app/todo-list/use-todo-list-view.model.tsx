import { useSysDataSourceWithLifecycle, ViewModelContract } from '@omni-box/sys-core';
import { SysHttpDispatcher } from '@omni-box/sys-core';
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

function getData(): Promise<TodoListDTO[]> {
  return SysHttpDispatcher.get<TodoListDTO[]>('/mock/todo-list.json');
}

export function useTodoListViewModel(): ViewModelContract<UseTodoListViewModelState> {
  const data = useSysDataSourceWithLifecycle<TodoListDTO[]>((params) => getData(), {
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
