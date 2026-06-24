import { SysAppError } from '../model/sys-app-error';

/**
 * Утилита для нормализации различных видов ошибок в единый формат SysAppError.
 * Позволяет обрабатывать ошибки разных типов (Error, string, object) и приводить их к единой структуре для удобства логирования и отображения.
 * @param error
 * @param options
 * @returns
 */
export function normalizeSysAppError(
  error: unknown,
  options?: {
    /** Фатальность по умолчанию, если нельзя определить */
    defaultFatal?: boolean;
    /** Сообщение по умолчанию */
    defaultMessage?: string;
  }
): SysAppError {
  if (error instanceof SysAppError) {
    return error;
  }

  const sysError = new SysAppError();

  sysError.origin = error;
  sysError.isFatal = options?.defaultFatal ?? true;

  if (error instanceof Error) {
    sysError.name = error.name || 'Error';
    sysError.message = error.message;
    sysError.stackTrace = error.stack ?? '';

    return sysError;
  }

  if (typeof error === 'string') {
    sysError.name = 'StringError';
    sysError.message = error;
    sysError.stackTrace = '';

    return sysError;
  }

  if (typeof error === 'object' && error !== null) {
    const anyErr = error as any;

    sysError.name = typeof anyErr.name === 'string' ? anyErr.name : 'UnknownObjectError';

    sysError.message = typeof anyErr.message === 'string' ? anyErr.message : options?.defaultMessage ?? 'Unknown error';

    sysError.stackTrace = typeof anyErr.stack === 'string' ? anyErr.stack : '';

    return sysError;
  }

  sysError.name = 'PrimitiveError';
  sysError.message = options?.defaultMessage ?? 'Non-object error thrown';
  sysError.stackTrace = '';

  return sysError;
}
