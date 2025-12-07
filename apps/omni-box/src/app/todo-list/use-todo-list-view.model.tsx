import { ViewModelContract } from '@omni-box/sys-core';
import { TableProps, Tag } from 'antd';

interface ITaskDTO {
  readonly id: string;
  name: string;
  tags: string[];
}

export interface UseTodoListViewModelState {
  column_config: TableProps<ITaskDTO>['columns'];
  table_data: ITaskDTO[];
}

export function useTodoListViewModel(): ViewModelContract<UseTodoListViewModelState> {
  const column_config: TableProps<ITaskDTO>['columns'] = [
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

  const table_data: ITaskDTO[] = [
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

  return {
    state: {
      column_config,
      table_data,
    },
    action: {},
  };
}
