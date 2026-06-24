import { SysCoreConfig } from '../config/sys-core-config';
import { Singleton } from '../decorators/singleton';
import { normalizeSysAppError } from '../utils/normalize-sys-app-error';
import { GlobalErrorHandler } from './sys-error-handler';

/**
 * Мост для перехвата глобальных ошибок и их обработки через SysErrorHandler.
 * Слушает события 'error' и 'unhandledrejection' на уровне окна и перенаправляет их в обработчик ошибок.
 * Это позволяет централизованно обрабатывать все ошибки, возникающие в приложении, и обеспечивать единый механизм логирования и уведомлений.
 * Является синглтоном, что гарантирует единственный экземпляр моста в рамках всего приложения.
 */
@Singleton
export class ErrorEventBridge {
  private readonly _handler: GlobalErrorHandler;

  constructor(private readonly _sysCoreConfig: SysCoreConfig) {
    this._handler = new GlobalErrorHandler(this._sysCoreConfig);

    this.init();
  }

  public init(): void {
    this.listenRuntimeErrors();
    this.listenUnhandledRejections();
  }

  private listenRuntimeErrors(): void {
    window.addEventListener('error', (event) => {
      this.forward(event.error);
    });
  }

  private listenUnhandledRejections(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.forward(event.reason);
    });
  }

  private forward(error: unknown): void {
    const normalized = normalizeSysAppError(error);
    this._handler.handle(normalized);
  }
}
