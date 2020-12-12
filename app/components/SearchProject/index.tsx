import React, { FC, useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { useActions } from 'kea';
import { Transition } from '@headlessui/react';

import SingleInput from 'components/SingleInput';
import Item from 'components/Item';
import { Search } from 'components/Icons';

import api from 'api';
import notificationsLogic from 'store/notifications';
import { SearchProjectResult } from 'types/common';

interface Props {
  label: string;
  labelSelected: string;
  onSelectResult: (result: SearchProjectResult | null) => void;
  selectedResult: SearchProjectResult | null;
  disabled: boolean;
}

const SearchProject: FC<Props> = ({ onSelectResult, label, labelSelected, selectedResult, disabled }) => {
  const [val, setVal] = useState('');
  const [results, setResults] = useState<SearchProjectResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [axiosToken, setAxiosToken] = useState<CancelTokenSource | null>(null);
  const { addError } = useActions(notificationsLogic);

  const search = (term: string) => {
    setIsLoading(true);
    if (axiosToken) {
      axiosToken.cancel();
    }
    const cancelToken = axios.CancelToken.source();
    setAxiosToken(cancelToken);
    api.commission
      .searchProject(term, cancelToken.token)
      .then((res) => {
        setIsLoading(false);
        setResults(res.proyectos);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsLoading(false);
        addError('Oops!', 'Ocurrió un problema conectando con el servidor, intente de nuevo más tarde');
      });
  };

  const onSelectItem = (result: SearchProjectResult) => () => {
    onSelectResult(result);
    setVal('');
    setIsLoading(false);
    setResults([]);
  };

  const setNullItem = () => {
    onSelectResult(null);
  };

  useEffect(() => {
    setResults([]);
    if (val === '') {
      setAxiosToken(null);
      setIsLoading(false);
      return;
    }
    search(val);
  }, [val]);

  if (selectedResult) {
    return (
      <Item
        label={labelSelected}
        text={selectedResult.nombre}
        textSec=""
        subText={selectedResult.encargado ? selectedResult.encargado.nombre : ''}
        onCancel={setNullItem}
        disabled={disabled}
      />
    );
  }

  return (
    <>
      <SingleInput
        id="project-search-input"
        label={label}
        placeholder="Buscar proyecto por nombre"
        endIcon={Search}
        onChangeValue={setVal}
        value={val}
        disabled={disabled}
      />
      <Transition
        show={val.length > 0}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="trantision-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="relative w-full z-10"
      >
        <div className="absolute w-full rounded-md bg-white shadow-lg overflow-auto" style={{ maxHeight: 280 }}>
          {results.map((result) => (
            <div
              key={result.id}
              onClick={onSelectItem(result)}
              className="flex flex-col text-gray-800 my-0 hover:bg-gray-300 py-2 px-4 cursor-pointer transition duration-200 rounded-md"
            >
              <p className="text-base">{result.nombre}</p>
              <p className="text-sm text-gray-600">
                {result.encargado ? `Encargado: ${result.encargado.nombre}` : 'Sin Encargado'}
              </p>
            </div>
          ))}
          {isLoading && <div className="text-center italic text-gray-600 py-5 animate-pulse">Buscando...</div>}
          {results.length === 0 && !isLoading && (
            <div className="text-center italic text-gray-600 py-5"> No se encontraron proyectos :( </div>
          )}
        </div>
      </Transition>
    </>
  );
};

export default SearchProject;
