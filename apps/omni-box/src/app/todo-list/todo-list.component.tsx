import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { RouterPaths } from '@omni-box/sys-shared';
import { Badge, Button, Input, Modal, Progress, Table, TableProps, Tag, Tooltip } from 'antd';
import * as React from 'react';
import { Link, RouteObject } from 'react-router-dom';

import { TodoListDTO } from './dto/todo-list.dto';
import { useTodoListViewModel } from './use-todo-list-view.model';

export const todoListRoute: RouteObject = {
  path: RouterPaths.TODO_LIST,
  Component: TodoListComponent,
};

function TodoListComponent(): React.JSX.Element {
  const { state, action } = useTodoListViewModel();

  const columnConfig: TableProps<TodoListDTO>['columns'] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Задача',
    },
    {
      key: 'task_status',
      dataIndex: 'task_status',
      title: 'Статус задачи',
      render: (_, { task_status }) => {
        return (
          <div className="flex items-center gap-2">
            <Badge status="success" />
            <span>{task_status}</span>
          </div>
        );
      },
    },
    {
      key: 'priority',
      dataIndex: 'priority',
      title: 'Приоритет',
    },
    {
      key: 'tags',
      dataIndex: 'tags',
      title: 'Теги',
      render: (_, { id, tags }) => {
        return (
          <div className="flex gap-1">
            {tags.map((t) => (
              <Tag color="geekblue" key={id + t}>
                {t}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      key: 'executor',
      dataIndex: 'executor',
      title: 'Исполнитель',
      render: (_, { executor }) => {
        return (
          <Link to="#" className="text-blue-400 underline">
            {executor}
          </Link>
        );
      },
    },
    {
      key: 'due_date',
      dataIndex: 'due_date',
      title: 'Срок выполнения',
    },
    {
      key: 'progress',
      dataIndex: 'progress',
      title: 'Прогресс',
      align: 'center',
      render: (_, { progress }) => {
        return <Progress type="circle" percent={Number(progress)} size={40} />;
      },
    },
    {
      key: 'modified_date',
      dataIndex: 'modified_date',
      title: 'Дата изменения',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-start gap-1">
            <Tooltip title="Добавить задачу">
              <Button icon={<PlusOutlined />} onClick={action.openAddTodoModal} />
            </Tooltip>
            <Tooltip title="Удалить задачу">
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
          <Input placeholder="Поиск задач" />
          <Button type="primary">Найти</Button>
        </div>
        <Table rowKey="id" bordered columns={columnConfig} dataSource={state.todoList} scroll={{ x: 'max-content' }} />
      </div>

      <Modal title="Новое задание" open={state.isModalOpen} onOk={action.addTodo} onCancel={action.cancelAddTodoModal}>
        <div className="flex flex-col gap-2 mt-5">
          <Input placeholder="Название задачи" {...action.register('name')} />
          <Input placeholder="Статус задачи" {...action.register('statusTask')} />
          <Input placeholder="Приоритет" {...action.register('priority')} />
          <Input placeholder="Теги" {...action.register('tags')} />
          <Input placeholder="Исполнитель" {...action.register('executor')} />
        </div>
      </Modal>
    </>
  );
}
