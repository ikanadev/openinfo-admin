import { FC } from 'react';

import { Roles } from 'store/auth/types';

// Icons
export interface IconProps {
  size?: number;
  color?: string;
}

export interface MenuItemData {
  id: number;
  icon: FC<IconProps>;
  title: string;
  component: FC<unknown>;
  subpath: string;
  path: string;
  availableTo: Roles;
}
