import { SysCoreConfig } from '../config/sys-core-config';
import { Singleton } from '../decorators/singleton';
import { SysAppError } from '../model/sys-app-error';

/**
 * Глобальный обработчик ошибок.
 * Определяет, является ли ошибка фатальной, и в зависимости от этого делает редирект.
 */
@Singleton
export class GlobalErrorHandler {
  constructor(private readonly sysCoreConfig: SysCoreConfig) {}

  public handle(error: SysAppError): void {
    console.log('GlobalErrorHandler', error);
    if (error.isFatal) {
      this.redirectToFatalPage();
      return;
    }
  }

  private redirectToFatalPage(): void {
    const redirectUrl = this.sysCoreConfig?.errorRoute ?? '/fatal-error';
    window.location.href = redirectUrl;
  }
}
