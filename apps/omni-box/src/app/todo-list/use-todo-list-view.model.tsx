import { useSysDataSourceWithLifecycle, ViewModelContract } from '@omni-box/sys-core';
import { SysHttpDispatcher } from '@omni-box/sys-core';
import { useState } from 'react';
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

import { TodoListDTO } from './dto/todo-list.dto';

interface UseTodoListViewModelState {
  fieldErrors: FieldErrors<CreationTaskForm>;
  todoList: TodoListDTO[];
  isModalOpen: boolean;
}

interface UseTodoListViewModelAction {
  register: UseFormRegister<CreationTaskForm>;
  openAddTodoModal: () => void;
  cancelAddTodoModal: () => void;
  addTodo: () => void;
  deleteTodo: (todoIds: string) => void;
}

interface CreationTaskForm {
  name: string;
  statusTask: string;
  priority: string;
  tags: string[];
  executor: string;
}

export function useTodoListViewModel(): ViewModelContract<UseTodoListViewModelState, UseTodoListViewModelAction> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreationTaskForm>();

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

  const onSubmit: SubmitHandler<CreationTaskForm> = (data) => console.log(data);

  const addTodo: UseTodoListViewModelAction['addTodo'] = async (): Promise<void> => {
    if (Object.keys(errors).length === 0) {
      await handleSubmit(onSubmit);
      setIsModalOpen(false);
    }
  };

  const deleteTodo: UseTodoListViewModelAction['deleteTodo'] = (todoId: string): void => {
    sysDataSource.updateValue(dataSource.value?.filter((todo) => todo.id !== todoId) || []);
  };

  return {
    state: {
      fieldErrors: errors,
      todoList: dataSource.value || [],
      isModalOpen,
    },
    action: { register, openAddTodoModal, cancelAddTodoModal, addTodo, deleteTodo },
  };
}

function getTodoList(): Promise<TodoListDTO[]> {
  return SysHttpDispatcher.get<TodoListDTO[]>('/mock/todo-list.json');
}
