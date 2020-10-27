import React, { FC, useState, useEffect } from 'react';
import { Transition, Listbox } from '@headlessui/react';

import { CaretDown } from 'components/Icons';
import Title from 'components/Title';
import Button from 'components/Button';
import Subtitle from 'components/Subtitle';
import SearchUser from 'components/SearchUser';

import { SearchResult } from 'types/common';

const users: Users[] = [
  { name: 'Dan Abramov', code: 'skejdl23' },
  { name: 'Adam Wathan', code: 'adjfl4' },
  { name: 'Jhon Calhoun', code: 'lksadjl9003' },
];
interface Area {
  id: number;
  name: string;
}
const areas: Area[] = [
  { id: 1, name: 'Desarrollo Web' },
  { id: 2, name: 'Robótica' },
  { id: 3, name: 'Seguridad' },
  { id: 4, name: 'IA' },
  { id: 5, name: 'IoT' },
];

interface Users {
  name: string;
  code: string;
}

const Juries: FC = () => {
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);

  const [results, setResults] = useState<Users[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area>(areas[0]);

  const handleSubmit = () => {
    //
  };

  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <div className="flex">
      <div className="flex-1">
        <Title text="Asignar Nuevo Jurado" />
        <SearchUser onSelectResult={setSelectedUser} label="Buscar jurado" />

        <Subtitle text="Jurado seleccionado" />
        {selectedUser ? (
          <div className="flex flex-col text-gray-800 p-2 bg-white shadow-sm rounded-md">
            <p className="text-base">
              {selectedUser.nombre}
              <span className="text-gray-600"> ({selectedUser.codRegistro})</span>
            </p>
            <span className="text-sm text-gray-600">{selectedUser.correo}</span>
          </div>
        ) : (
          <p className="text-gray-600 text-center italic my-4">Busque y seleccione un jurado</p>
        )}

        <div className="mt-4 flex items-center mb-4">
          <Listbox value={selectedArea} onChange={setSelectedArea}>
            {({ open }) => (
              <>
                <Listbox.Label className="text-sm leading-5 font-medium text-gray-700">
                  Categoria proyecto:
                </Listbox.Label>
                <div className="relative flex-1 ml-5 shadow-sm bg-white py-0 rounded border border-gray-200">
                  <Listbox.Button className="w-full flex items-center px-2 text-left focus:outline-none text-gray-700 focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    <div className="flex-1">{selectedArea.name}</div>
                    <CaretDown />
                  </Listbox.Button>
                  <Transition
                    show={open}
                    leave="transition ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                  >
                    <Listbox.Options className="rounded-md text-base shadow-lg focus:outline-none overflow-hidden">
                      {areas.map((area) => (
                        <Listbox.Option key={area.id} value={(area as unknown) as string}>
                          {({ active, selected }) => (
                            <div
                              className={`${
                                active ? 'bg-gray-300' : 'text-gray-900'
                              } cursor-pointer select-none relative py-1 px-2`}
                            >
                              <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate text-sm`}>
                                {area.name}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <Button label="Asignar" onClick={handleSubmit} type="proceed" full />
      </div>

      <div className="flex-1 ml-5">
        <Title text="Jurados Designados" />
        <div className="pl-4">
          <Subtitle text="Robótica" />
          {users.map((user) => (
            <div key={user.code} className="flex flex-col text-gray-800 my-0 pb-2">
              <span className="text-base">{user.name}</span>
              <span className="text-sm text-gray-600">{user.code}</span>
            </div>
          ))}
          <Subtitle text="Desarrollo web" />
          {users.map((user) => (
            <div key={user.code} className="flex flex-col text-gray-800 my-0 pb-2">
              <span className="text-base">{user.name}</span>
              <span className="text-sm text-gray-600">{user.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Juries;
