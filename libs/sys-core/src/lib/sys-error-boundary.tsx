import * as React from 'react';

import { SysAppError } from './model/sys-app-error';
import { normalizeSysAppError } from './utils/normalize-sys-app-error';

export class SysErrorBoundary extends React.Component<{ children: React.ReactNode }, { error?: SysAppError }> {
  public static getDerivedStateFromError(error: unknown) {
    return { error: normalizeSysAppError(error) };
  }

  public override render(): React.ReactNode {
    // if (this.state.error?.isFatal) {
    //   return <div>error</div>;
    // }

    return <div>error</div>;
  }
}
