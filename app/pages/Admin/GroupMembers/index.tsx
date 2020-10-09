import React, { FC, useState } from 'react';
import { Transition, Listbox } from '@headlessui/react';

import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import Button from 'components/Button';
import SingleInput from 'components/SingleInput';
import { Search, CaretDown } from 'components/Icons';
import ImageSelector from 'components/ImageSelector';

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
  { id: 1, name: 'Estudiante' },
  { id: 2, name: 'Lic.' },
  { id: 3, name: 'Ms. C.' },
  { id: 4, name: 'Dr.' },
  { id: 5, name: 'Ph. D.' },
];

const areas2: Area[] = [
  { id: 1, name: 'Actividad 1' },
  { id: 2, name: 'Actividad 2' },
  { id: 3, name: 'Actividad 3' },
];

interface Users {
  name: string;
  code: string;
}

const GroupMembers: FC = () => {
  const [val, setVal] = useState('');
  const [results, setResults] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<Area>(areas[0]);
  const [selectedArea2, setSelectedArea2] = useState<Area>(areas2[0]);

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
        <Title text="Agregar Integrante" />

        <div className="mb-4">
          <SingleInput
            id="new-member-input"
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

        <Subtitle text="Datos integrante" />
        <div className="flex flex-col text-gray-800 my-0 pb-2">
          <span className="text-base">Dan Abramov</span>
          <span className="text-sm text-gray-600">dana324</span>
        </div>

        <div className="flex">
          <div className="flex-1">
            <ImageSelector imgUrl="" label="Foto:" setFile={handleSubmit} setUrlFile={handleSubmit} />
          </div>
          <div className="flex-1">
            <SingleInput
              id="new-member-ci"
              label="C.I."
              placeholder="Ej. 10255566"
              onChangeValue={setVal}
              value={val}
            />
            <SingleInput
              id="new-member-phone"
              label="Telf. o Celular"
              placeholder="Ej. 6654566"
              onChangeValue={setVal}
              value={val}
            />
            <div className="flex">
              <Listbox value={selectedArea} onChange={setSelectedArea}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="text-sm leading-5 font-medium text-gray-700">Grado:</Listbox.Label>
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
                                  <span
                                    className={`${selected ? 'font-semibold' : 'font-normal'} block truncate text-sm`}
                                  >
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
          </div>
        </div>

        <SingleInput
          id="new-member-contact-1"
          label="Contacto 1"
          placeholder="Ej. facebook, github, linkedin"
          onChangeValue={setVal}
          value={val}
        />
        <SingleInput
          id="new-member-contact-2"
          label="Contacto 2"
          placeholder="Ej. facebook, github, linkedin"
          onChangeValue={setVal}
          value={val}
        />

        <div className="flex mb-5">
          <Listbox value={selectedArea2} onChange={setSelectedArea2}>
            {({ open }) => (
              <>
                <Listbox.Label className="text-sm leading-5 font-medium text-gray-700">Actividad:</Listbox.Label>
                <div className="relative flex-1 ml-5 shadow-sm bg-white py-0 rounded border border-gray-200">
                  <Listbox.Button className="w-full flex items-center px-2 text-left focus:outline-none text-gray-700 focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    <div className="flex-1">{selectedArea2.name}</div>
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
                      {areas2.map((area) => (
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

        <Button label="Agregar" onClick={handleSubmit} type="proceed" full />
      </div>
      <div className="flex-1 ml-5">
        <Title text="Lista Integrantes" />
        {users.map((user) => (
          <div key={user.code} className="flex flex-col text-gray-800 my-0 pb-2">
            <span className="text-base">{user.name}</span>
            <span className="text-sm text-gray-600">{user.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMembers;
