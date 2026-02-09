import { RouterPaths } from '@omni-box/sys-shared';
import { RouteObject } from 'react-router-dom';

import styles from './draw.module.scss';

export const omniBoxDrawRoute: RouteObject = {
  path: RouterPaths.DRAW,
  Component: OmniBoxDraw,
};

export function OmniBoxDraw() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OmniBoxDraw!</h1>

      <canvas width={'100%'} height={'100%'} />
    </div>
  );
}

export default OmniBoxDraw;
