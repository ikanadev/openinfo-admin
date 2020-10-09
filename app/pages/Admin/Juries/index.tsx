import React, { FC, useState, useEffect } from 'react';
import { Transition, Listbox } from '@headlessui/react';

import { CaretDown, Search } from 'components/Icons';
import SingleInput from 'components/SingleInput';
import Title from 'components/Title';
import Button from 'components/Button';
import Subtitle from 'components/Subtitle';

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
  const [results, setResults] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<Area>(areas[0]);

  const search = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      setResults(users);
      return;
    }
    setResults([]);
  };

  const handleSubmit = () => {
    //
  };

  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="mb-10">
          <Title text="Buscar Jurado" />
          <SingleInput
            id="jury-search-input"
            label="Buscar por nombre o código de usuario"
            placeholder="Ej. Pepito, Juan, user23"
            endIcon={Search}
            onChangeValue={search}
            value={searchTerm}
          />
          <Transition
            show={results.length > 0}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="relative w-full z-10 transform -translate-y-3"
          >
            <div className="absolute w-full rounded-md bg-white shadow-lg overflow-hidden">
              {results.map((result) => (
                <div
                  key={result.code}
                  className="flex flex-col text-gray-800 my-0 hover:bg-gray-300 py-2 px-4 cursor-pointer transition duration-200"
                >
                  <span className="text-base">{result.name}</span>
                  <span className="text-sm text-gray-600">{result.code}</span>
                </div>
              ))}
              {/* <div className="text-center italic text-gray-600 py-5"> No results found :(</div> */}
            </div>
          </Transition>
        </div>

        <Title text="Asignar Nuevo Jurado" />
        <Subtitle text="Jurado seleccionado" />
        <div className="flex flex-col text-gray-800 my-0 pb-2">
          <span className="text-base">Dan Abramov</span>
          <span className="text-sm text-gray-600">dana324</span>
        </div>

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
