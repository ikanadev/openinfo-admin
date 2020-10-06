import React, { FC, useEffect } from 'react';
import { useValues } from 'kea';
import { useHistory } from 'react-router-dom';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import HeaderAdmin from './HeaderAdmin';
import AdminGreeting from 'pages/Admin/Greeting';
import Menu from './Menu';

import authLogic from 'store/auth';
import { MenuItemData } from 'types/common';
import { getItemsByRole } from './Menu/menuData';

const Admin: FC = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const {
    data: { isLogged, roles },
  } = useValues(authLogic);

  const routes: MenuItemData[] = roles.reduce<MenuItemData[]>((res, role) => {
    const results = getItemsByRole(role);
    return [...res, ...results];
  }, []);

  useEffect(() => {
    if (!isLogged) {
      history.replace('/');
    }
  }, [isLogged]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-500 px-10 pt-10">
      <div
        className="p-8 bg-white shadow-lg container mx-auto flex flex-col"
        style={{ borderRadius: 40, minHeight: 'calc(100vh - 5rem)' }}
      >
        <div className="mb-6">
          <HeaderAdmin />
        </div>
        <div className="flex flex-1">
          <div className="w-48 lg:w-64 border-r border-gray-400">
            <Menu />
          </div>
          <div className="flex-1 ml-8">
            <Switch>
              <Route exact path={path}>
                <AdminGreeting />
              </Route>
              {routes.map((route) => (
                <Route key={route.id} path={`${path}${route.subpath}`}>
                  <route.component />
                </Route>
              ))}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
