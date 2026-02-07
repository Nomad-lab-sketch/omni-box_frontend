export enum RouterPaths {
  MAIN = '',
  TODO_LIST = 'todo-list',
  HELL_HOUND = 'hell-hound',
  AAMN = 'aamn',
  FRAMEWORK = 'framework',
  DRAW = 'draw',
}

export const ROUTER_PATH_LABELS: Record<RouterPaths, string> = {
  [RouterPaths.MAIN]: 'Главная',
  [RouterPaths.TODO_LIST]: 'Список задач',
  [RouterPaths.HELL_HOUND]: 'Цербер',
  [RouterPaths.AAMN]: 'Распределенная адаптивная сеть памяти',
  [RouterPaths.FRAMEWORK]: 'Фреймворк',
  [RouterPaths.DRAW]: 'Рисовальня',
};
