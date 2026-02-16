import { RouterPaths } from '@omni-box/sys-shared';
import { RouteObject } from 'react-router-dom';

import styles from './omni-box-draw.module.scss';
import { useOmniBoxDrawViewModel } from './omni-box-draw.viewModel';

export const omniBoxDrawRoute: RouteObject = {
  path: RouterPaths.DRAW,
  Component: OmniBoxDraw,
};

export function OmniBoxDraw() {
  const { state, action } = useOmniBoxDrawViewModel();

  return (
    <div className={styles['container']}>
      <div className={styles['canvas-wrapper']} ref={state.canvasWrapperRef}>
        <canvas ref={state.canvasRef} />
      </div>
    </div>
  );
}

export default OmniBoxDraw;
