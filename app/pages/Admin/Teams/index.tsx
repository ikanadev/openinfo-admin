import React, { FC, useState } from 'react';
import { Transition, Listbox } from '@headlessui/react';

import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import { CaretDown, Search } from 'components/Icons';
import SingleInput from 'components/SingleInput';
import Button from 'components/Button';

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
  { id: 1, name: 'Materia' },
  { id: 2, name: 'Grupo de Estudio' },
  { id: 3, name: 'Sociedad Cient.' },
  { id: 4, name: 'Invitado' },
  { id: 5, name: 'Sin categoria' },
];

interface Users {
  name: string;
  code: string;
}

const Teams: FC = () => {
  const [selectedArea, setSelectedArea] = useState<Area>(areas[0]);
  const [val, setVal] = useState('');
  const [results, setResults] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
  return (
    <div className="flex">
      <div className="flex-1">
        <Title text="Crear Nuevo Equipo" />

        <div className="mt-4 flex items-center mb-4">
          <Listbox value={selectedArea} onChange={setSelectedArea}>
            {({ open }) => (
              <>
                <Listbox.Label className="text-sm leading-5 font-medium text-gray-700">Tipo Equipo:</Listbox.Label>
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

        <SingleInput
          label="Nombre del grupo:"
          placeholder="Ej. INF-113, FullStack, Sociedad Cientif. etc."
          value={val}
          onChangeValue={setVal}
          id="group-name-input"
        />

        <div className="mt-1">
          <SingleInput
            id="leader-jury-search-input"
            label="Buscar encargado"
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

          <Subtitle text="Encargado seleccionado" />
          <div className="flex flex-col text-gray-800 my-0 pb-2">
            <span className="text-base">Dan Abramov</span>
            <span className="text-sm text-gray-600">dana324</span>
          </div>

          <Button label="Crear Equipo" type="proceed" onClick={handleSubmit} full />
        </div>
      </div>
      <div className="flex-1 ml-5">
        <Title text="Equipos Creados" />
      </div>
    </div>
  );
};

export default Teams;
