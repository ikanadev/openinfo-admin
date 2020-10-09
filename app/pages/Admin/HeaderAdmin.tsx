import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions, useValues } from 'kea';
import { Menu, Transition } from '@headlessui/react';

import { Logout, CaretDown, User } from 'components/Icons';

import authLogic from 'store/auth';

const HeaderAdmin: FC = () => {
  const { logout } = useActions(authLogic);
  const {
    data: { username, name },
    title,
  } = useValues(authLogic);
  const history = useHistory();

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
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                  <span className="mr-2">
                    <User />
                  </span>
                  <span>Mi perfil</span>
                  <span className="ml-2">
                    <CaretDown />
                  </span>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Inicio sesión como:</p>
                    <p className="text-sm font-semibold leading-5 text-gray-900 truncate">{`${name} (${username})`}</p>
                  </div>

                  <div className="py-1">
                    <Menu.Item
                      as="span"
                      disabled
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    >
                      Mi perfil (pronto)
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#license"
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Salir
                        </a>
                      )}
                    </Menu.Item> */}
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
                        >
                          <span className="mr-2">
                            <Logout />
                          </span>
                          Salir
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default HeaderAdmin;
