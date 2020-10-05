import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';
import { useHistory } from 'react-router-dom';

import CircleLoader from 'components/CircleLoader';

import authLogic from 'store/auth';

const Main: FC = () => {
  const { data, checkingToken } = useValues(authLogic);
  const { checkToken } = useActions(authLogic);
  const history = useHistory();

  useEffect(() => {
    if (!checkingToken && data.isLogged) {
      history.push('/admin');
    }
    if (!checkingToken && !data.isLogged) {
      history.push('/login');
    }
  }, [checkingToken, data]);
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <CircleLoader />
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Main;
