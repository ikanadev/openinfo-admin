import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from 'kea';

import { UserCircle, Logout, User } from 'components/Icons';

import authLogic from 'store/auth';

const HeaderAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useActions(authLogic);
  const history = useHistory();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    logout();
    history.push('/login');
  };
  return (
    <div className="flex items-center">
      <p className="uppercase font-bold text-blue-700 text-xl">OpenInfo</p>
      <p className="flex-1 text-center font-semibold text-lg text-gray-800">Administración de Usuarios</p>
      <span className="items-center justify-center text-blue-700 relative inline-block">
        <span className="cursor-pointer" onClick={toggleMenu}>
          <UserCircle size={30} />
        </span>
        <div
          className={`absolute overflow-hidden rounded right-0 shadow-lg flex flex-col text-gray-800 ${
            isOpen ? '' : 'hidden'
          }`}
        >
          <div className="flex items-center hover:bg-gray-300 p-2 cursor-pointer" onClick={handleLogout}>
            <span>
              <Logout />
            </span>
            <p>Salir</p>
          </div>
          <div className="flex items-center hover:bg-gray-300 p-2 cursor-pointer">
            <span>
              <User />
            </span>
            <p>Perfil</p>
          </div>
        </div>
      </span>
    </div>
  );
};

export default HeaderAdmin;
