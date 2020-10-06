import React, { FC } from 'react';
import { useValues, useActions } from 'kea';
import { useHistory, useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';

import authLogic from 'store/auth';
import { getRoleText } from 'utils/function';
import { getItemsByRole } from './menuData';

const Menu: FC = () => {
  const {
    data: { roles },
  } = useValues(authLogic);
  const { setTitle } = useActions(authLogic);
  const history = useHistory();
  const { pathname } = useLocation();

  const navigate = (path: string, title: string) => () => {
    setTitle(title);
    history.push(path);
  };
  return (
    <>
      {roles.map((role) => (
        <div key={role} className="mt-0">
          <div className="mb-1 mt-6 text-right mr-4 text-blue-700 font-header text-sm font-semibold leading-5 tracking-wide">
            <p>COMO</p>
            <p className="text-xl">{getRoleText(role).toUpperCase()}</p>
            <p>USTED PUEDE :</p>
          </div>
          {getItemsByRole(role).map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              Icon={menuItem.icon}
              title={menuItem.title}
              onClick={navigate(menuItem.path, menuItem.title)}
              isSelected={pathname === menuItem.path}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Menu;
