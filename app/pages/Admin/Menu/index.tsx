import React, { FC } from 'react';
import { useValues } from 'kea';
import { useHistory, useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';

import authLogic from 'store/auth';
import { getRoleText } from 'utils/function';
import { getItemsByRole } from './menuData';

const Menu: FC = () => {
  const {
    data: { role },
  } = useValues(authLogic);
  const history = useHistory();
  const { pathname } = useLocation();

  const menuItems = getItemsByRole(role);
  const navigate = (path: string) => () => {
    history.push(path);
  };
  return (
    <div className="mt-0">
      <div className="mb-8 text-right mr-4 text-blue-700 font-header text-base font-semibold leading-5 tracking-wide">
        <p>COMO</p>
        <p className="text-2xl">{getRoleText(role).toUpperCase()}</p>
        <p>USTED PUEDE :</p>
      </div>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          Icon={menuItem.icon}
          title={menuItem.title}
          onClick={navigate(menuItem.path)}
          isSelected={pathname === menuItem.path}
        />
      ))}
    </div>
  );
};

export default Menu;
