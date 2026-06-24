import { ROUTER_PATH_LABELS, RouterItem, RouterPaths } from '@omni-box/sys-shared';
import { Link } from 'react-router-dom';

export const appRoute: RouterItem[] = [
  {
    path: `/${RouterPaths.TODO_LIST}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.TODO_LIST}>
        {ROUTER_PATH_LABELS['todo-list']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.HELL_HOUND}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.HELL_HOUND}>
        {ROUTER_PATH_LABELS['hell-hound']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.AAMN}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.AAMN}>
        {ROUTER_PATH_LABELS['aamn']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.FRAMEWORK}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.FRAMEWORK}>
        {ROUTER_PATH_LABELS['framework']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.DRAW}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.DRAW}>
        {ROUTER_PATH_LABELS['draw']}
      </Link>
    ),
  },
  {
    path: `/${RouterPaths.EDITOR}`,
    linkElement: (
      <Link className="text-blue-600" to={RouterPaths.EDITOR}>
        {ROUTER_PATH_LABELS['editor']}
      </Link>
    ),
  },
];
