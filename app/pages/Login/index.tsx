import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useValues, useActions } from 'kea';

import AdminImage from './AdminImage';

import authLogic from 'store/auth';
import { useInput } from 'utils/hooks';

const Login: FC = () => {
  const [email, onEmail, setEmail] = useInput('');
  const [passwd, onPasswd, setPasswd] = useInput('');

  const {
    data: { isLogged },
    loadingAuth,
    checkingToken,
  } = useValues(authLogic);
  const { login } = useActions(authLogic);
  const history = useHistory();

  const handleLogin = () => {
    login(email, passwd);
  };

  useEffect(() => {
    if (!isLogged && checkingToken) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      history.push('/admin');
    }
  }, [isLogged]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-700 to-purple-800 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8  shadow-lg max-w-md transform -translate-y-20">
        <h4 className="text-2xl text-blue-600 mx-auto text-center font-medium mb-3 uppercase">
          OpenInfo Administración
        </h4>
        <AdminImage />
        <div className="my-5">
          <div className="flex items-center mb-2">
            <label htmlFor="input-email" className="w-1/3 text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4">
              Correo:
            </label>
            <input
              className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="input-email"
              type="text"
              placeholder="ejemplo@domain.bo"
              value={email}
              onChange={onEmail}
            ></input>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="input-password"
              className="w-1/3 text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
            >
              Contraseña:
            </label>
            <input
              className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="input-password"
              type="password"
              value={passwd}
              onChange={onPasswd}
            ></input>
          </div>
        </div>
        <button
          className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded py-2 font-medium tracking-wide uppercase"
          onClick={handleLogin}
          disabled={loadingAuth}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
