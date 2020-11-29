import React, { FC, MouseEvent, useState } from 'react';
import { useActions } from 'kea';
import { Link } from 'react-router-dom';

import Image from './Image';

import api from 'api';
import { useInput } from 'utils/hooks';
import notificationLogic from 'store/notifications';

const Login: FC = () => {
  const [name, onName, setName] = useInput('');
  const [email, onEmail, setEmail] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { addSuccess } = useActions(notificationLogic);

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage('');
      const resp = await api.auth.register({ correo: email, nombre: name, sexo: '' });
      addSuccess('Hecho!', resp.mensaje);
      setIsLoading(false);
      setName('');
      setEmail('');
      setMessage(
        `Podrá iniciar sesión con el usuario: ${resp.usuario.codRegistro} (contraseña por defecto) y su correo: ${resp.usuario.correo}. Su cuenta estará disponible cuando sea parte de un proyecto o la comisión le designe algún rol.`,
      );
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-700 to-purple-800 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8  shadow-lg max-w-md transform -translate-y-20">
        <form>
          <h4 className="text-2xl text-blue-600 mx-auto text-center font-medium mb-3 uppercase">Registro OpenInfo</h4>
          {message.length > 0 && (
            <div className="p-5 my-3 rounded-md border-solid border-green-600 bg-green-100 border text-green-700">
              {message}
            </div>
          )}
          <Image />
          <div className="flex items-center my-2">
            <label
              htmlFor="register-input-name"
              className="w-1/3 text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
            >
              Nombre:
            </label>
            <input
              className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              id="register-input-name"
              type="text"
              placeholder="Ej. Julio Melgar"
              value={name}
              onChange={onName}
              autoFocus
              disabled={isLoading}
            />
          </div>
          <div className="my-2 mb-5">
            <div className="flex items-center mb-2">
              <label
                htmlFor="register-input-email"
                className="w-1/3 text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4"
              >
                Correo:
              </label>
              <input
                className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                id="register-input-email"
                type="text"
                placeholder="ejemplo@domain.bo"
                value={email}
                onChange={onEmail}
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            className={`${
              isLoading && 'animate-pulse opacity-75'
            } w-full max-w-md mx-auto bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded py-2 font-medium tracking-wide uppercase`}
            onClick={handleRegister}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Registrando' : 'Registrarse'}
          </button>
        </form>
        <p className="text-right text-blue-700 hover:underline cursor-pointer mt-2 italic mb-0">
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
