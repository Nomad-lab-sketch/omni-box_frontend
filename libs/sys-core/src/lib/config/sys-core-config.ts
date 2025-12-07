/**
 *  Класс настроек ядра.
 */
export class SysCoreConfig {
  /**
   *  Ссылка на объект `environment`, харнящий данные о среде на которую приложение было собрано.
   *  @name env
   *  @type {any}
   */
  public env: any;

  /**
   *  Имя роута для возврата в систему после перехода на аварийную страницу.
   *  Опциональный параметр.
   *  @name goBackRoute
   *  @type {string}
   */
  public goBackRoute?: string;

  /**
   *  Имя роута для перехода на аварийную страницу.
   *  @name errorRoute
   *  @type {string}
   */
  public errorRoute: string;

  /**
   *  Создает инстанс конфигурации ядра.
   *  @constructor
   *  @param {SysCoreConfig} config - объект с настроками ядра.
   */
  constructor(config: SysCoreConfig) {
    this.env = config.env;
    this.goBackRoute = config.goBackRoute;
    this.errorRoute = config.errorRoute;
  }
}
