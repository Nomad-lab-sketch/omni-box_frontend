export interface TodoListDTO {
  readonly id: string;
  name: string;
  task_status: string;
  priority: string;
  tags: string[];
  executor: string;
  due_date: string;
  progress: string;
  modified_date: string;
}