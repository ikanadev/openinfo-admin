import React, { FC, useEffect } from 'react';
import { useValues, useActions, useMountedLogic } from 'kea';
import { useHistory } from 'react-router-dom';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import HeaderAdmin from './HeaderAdmin';
import AdminGreeting from 'pages/Admin/Greeting';
import CircleLoader from 'components/CircleLoader';
import Profile from './Profile';
import Menu from './Menu';

import leaderProjectsLogic from 'store/data/leaderProjects';
import userProjectsLogic from 'store/data/userProjects';
import leaderTeamsLogic from 'store/data/leaderTeams';
import activitiesLogic from 'store/data/activities';
import commissionLogic from 'store/data/commission';
import { getItemsByRole } from './Menu/menuData';
import sponsorsLogic from 'store/data/sponsors';
import siteDataLogic from 'store/data/siteData';
import juriesLogic from 'store/data/juries';
import { MenuItemData } from 'types/common';
import teamsLogic from 'store/data/teams';
import periodLogic from 'store/data/period';
import authLogic from 'store/auth';

const Admin: FC = () => {
  useMountedLogic(sponsorsLogic);
  useMountedLogic(teamsLogic);
  useMountedLogic(leaderTeamsLogic);
  useMountedLogic(leaderProjectsLogic);
  useMountedLogic(userProjectsLogic);
  useMountedLogic(juriesLogic);
  useMountedLogic(activitiesLogic);
  useMountedLogic(commissionLogic);
  useMountedLogic(periodLogic);
  const history = useHistory();
  const { path } = useRouteMatch();
  const { logout } = useActions(authLogic);
  const {
    data: { isLogged, roles },
  } = useValues(authLogic);
  const { getData } = useActions(siteDataLogic);
  const { error, isLoading } = useValues(siteDataLogic);

  const routes: MenuItemData[] = roles.reduce<MenuItemData[]>((res, role) => {
    const results = getItemsByRole(role);
    return [...res, ...results];
  }, []);

  useEffect(() => {
    if (!isLogged) {
      history.replace('/');
      return;
    }
    getData();
  }, [isLogged]);
  useEffect(() => {
    if (error) logout();
  }, [error]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-500 px-10 pt-10">
      <div
        className="p-8 bg-gray-200 shadow-lg container mx-auto flex flex-col"
        style={{ borderRadius: 40, minHeight: 'calc(100vh - 5rem)' }}
      >
        {isLoading ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <CircleLoader size={50} />
            <p className="italic text-gray-600 animate-pulse">Obteniendo datos inciales...</p>
          </div>
        ) : (
          <>
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
                  <Route path="/admin/profile">
                    <Profile />
                  </Route>
                  {routes.map((route) => (
                    <Route key={route.id} path={`${path}${route.subpath}`}>
                      <route.component />
                    </Route>
                  ))}
                </Switch>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
