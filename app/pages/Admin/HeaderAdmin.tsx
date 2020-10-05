import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions, useValues } from 'kea';

import { UserCircle, Logout, User } from 'components/Icons';

import authLogic from 'store/auth';

const HeaderAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useActions(authLogic);
  const {
    data: { username },
    title,
  } = useValues(authLogic);
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
      <p className="uppercase font-bold text-blue-700 font-header text-2xl tracking-wide">OpenInfo</p>
      <p className="flex-1 text-center font-semibold font-header text-4xl text-gray-700 tracking-wide">
        {title.toUpperCase()}
      </p>
      <span className="items-center justify-center text-blue-700 relative inline-block">
        <span className="flex items-center cursor-pointer" onClick={toggleMenu}>
          {username}
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
