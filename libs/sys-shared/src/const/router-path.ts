export enum RouterPaths {
  MAIN = '',
  TODO_LIST = 'todo-list',
}

export const ROUTER_PATH_LABELS: Record<RouterPaths, string> = {
  [RouterPaths.MAIN]: 'Главная',
  [RouterPaths.TODO_LIST]: 'Список задач',
};
