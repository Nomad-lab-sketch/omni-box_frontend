/**
 * Базовый интерфейс для ViewModel в архитектуре MVVM.
 * Определяет контракт для моделей представления, которые используются в компонентах.
 *
 * @template SysViewModelStates - Тип, описывающий состояние модели (обычно объект с данными)
 * @template SysViewModelAction - Тип, описывающий действия/методы модели (обычно объект с функциями)
 *
 * @example
 * // Пример реализации ViewModel для компонента пользователя
 * interface UserState {
 *   name: string;
 *   email: string;
 *   isLoading: boolean;
 * }
 *
 * interface UserActions {
 *   updateProfile: (data: Partial<UserState>) => Promise<void>;
 *   fetchUser: (id: string) => Promise<void>;
 *   reset: () => void;
 * }
 *
 * const useUserViewModel = (): ViewModel<UserState, UserActions> => {
 *   const [state, setState] = useState<UserState>({...});
 *
 *   const action = {
 *     updateProfile: async (data) => { ... },
 *     fetchUser: async (id) => { ... },
 *     reset: () => setState(initialState)
 *   };
 *
 *   return { state, action };
 * };
 */
export interface SysViewModelContract<SysViewModelStates = object, SysViewModelAction = object> {
  /**
   * Текущее состояние модели.
   * Содержит реактивные данные, которые отображаются в компоненте.
   * Доступно только для чтения - изменение состояния должно происходить через экшены.
   *
   * @readonly
   */
  readonly state: Readonly<SysViewModelStates>;

  /**
   * Набор действий (методов) для взаимодействия с моделью.
   * Содержит функции для изменения состояния, выполнения побочных эффектов,
   * обработки пользовательского ввода и бизнес-логики.
   *
   * @readonly
   */
  readonly action: SysViewModelAction;
}
