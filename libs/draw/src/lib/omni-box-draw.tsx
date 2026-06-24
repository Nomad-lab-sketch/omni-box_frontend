import { useSysDataSourceWithLifecycle } from '@omni-box/sys-core';
import { RouterPaths } from '@omni-box/sys-shared';
import axios from 'axios';
import { useEffect } from 'react';
import { RouteObject } from 'react-router-dom';

import styles from './omni-box-draw.module.scss';
import { useOmniBoxDrawViewModel } from './omni-box-draw.viewModel';

export const omniBoxDrawRoute: RouteObject = {
  path: RouterPaths.DRAW,
  Component: OmniBoxDraw,
};

interface User {
  readonly id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  readonly createdAt: Date;
}

function getUsers(): Promise<User[] | void> {
  return axios
    .get<User[]>('users.json')
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

export function OmniBoxDraw() {
  const { state, action } = useOmniBoxDrawViewModel();

  const dataSource = useSysDataSourceWithLifecycle(getUsers, { autoLoad: true });

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <div className={styles['container']}>
      <div className={styles['canvas-tools']}>
        <div className="flex align-center gap-2">
          <label>Цвет:</label>
          <input type="color" value={state.color} onChange={action.changeColor} />
        </div>
      </div>
      <div className={styles['canvas-wrapper']} ref={state.canvasWrapperRef}>
        <canvas ref={state.canvasRef} />
      </div>
    </div>
  );
}

export default OmniBoxDraw;
