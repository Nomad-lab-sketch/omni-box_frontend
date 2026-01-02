/// <reference types="vite/client" />

/**
 * Vite environment variables interface.
 */
interface ImportMetaEnv {
  readonly VITE_APP_BUILD_TARGET: 'development' | 'staging' | 'production';
  readonly VITE_BACK_ROUTE?: string;
  readonly VITE_ERROR_ROUTE: string;
  readonly VITE_BACKEND_API_URL?: string;
}

/**
 * Vite import meta interface.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
