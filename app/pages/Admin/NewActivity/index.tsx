import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import SingleInput from 'components/SingleInput';
import Subtitle from 'components/Subtitle';
import Button from 'components/Button';
import Title from 'components/Title';
import { Search } from 'components/Icons';

const users: Users[] = [
  { name: 'Dan Abramov', code: 'skejdl23' },
  { name: 'Adam Wathan', code: 'adjfl4' },
  { name: 'Jhon Calhoun', code: 'lksadjl9003' },
];

interface Users {
  name: string;
  code: string;
}

const NewActivity: FC = () => {
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
    <div>
      <Title text="Crear Actividad" />
      <Subtitle text="Datos actividad" />
      <SingleInput
        value={val}
        onChangeValue={setVal}
        label="Titulo"
        id="new-activity-input"
        placeholder="Ej. Manejo de luces con IoT, Creacion de un sitio web..."
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

        <Button label="Crear Actividad" type="proceed" onClick={handleSubmit} full />
      </div>
    </div>
  );
};

export default NewActivity;
