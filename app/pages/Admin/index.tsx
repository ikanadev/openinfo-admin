import React, { FC, useEffect } from 'react';
import { useValues } from 'kea';
import { useHistory } from 'react-router-dom';

import HeaderAdmin from './HeaderAdmin';

import authLogic from 'store/auth';

const Admin: FC = () => {
  const history = useHistory();
  const {
    data: { isLogged },
  } = useValues(authLogic);

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
          <div className="w-48 lg:w-64 border-r border-gray-400">Menu</div>
          <div className="flex-1 ml-8">Contenido</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
