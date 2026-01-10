import { useSysDataSourceWithLifecycle, ViewModelContract } from '@omni-box/sys-core';
import { SysHttpDispatcher } from '@omni-box/sys-core';
import { useState } from 'react';

import { TodoListDTO } from './dto/todo-list.dto';

interface UseTodoListViewModelState {
  todoList: TodoListDTO[];
  isModalOpen: boolean;
}

interface UseTodoListViewModelAction {
  openAddTodoModal: () => void;
  cancelAddTodoModal: () => void;
  addTodo: () => void;
  deleteTodo: (todoIds: string) => void;
}

export function useTodoListViewModel(): ViewModelContract<UseTodoListViewModelState, UseTodoListViewModelAction> {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { dataSource, sysDataSource } = useSysDataSourceWithLifecycle<TodoListDTO[]>((params) => getTodoList(), {
    autoLoad: true,
  });

  const openAddTodoModal: UseTodoListViewModelAction['openAddTodoModal'] = (): void => {
    setIsModalOpen(true);
  };

  const cancelAddTodoModal: UseTodoListViewModelAction['cancelAddTodoModal'] = (): void => {
    setIsModalOpen(false);
  };

  const addTodo: UseTodoListViewModelAction['addTodo'] = (): void => {
    setIsModalOpen(true);
  };

  const deleteTodo: UseTodoListViewModelAction['deleteTodo'] = (todoId: string): void => {
    sysDataSource.updateValue(dataSource.value?.filter((todo) => todo.id !== todoId) || []);
  };

  return {
    state: {
      todoList: dataSource.value || [],
      isModalOpen,
    },
    action: { openAddTodoModal, cancelAddTodoModal, addTodo, deleteTodo },
  };
}

function getTodoList(): Promise<TodoListDTO[]> {
  return SysHttpDispatcher.get<TodoListDTO[]>('/mock/todo-list.json');
}
