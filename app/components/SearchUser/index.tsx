import React, { FC, useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { useActions } from 'kea';
import { Transition } from '@headlessui/react';

import SingleInput from 'components/SingleInput';
import Item from 'components/Item';
import { Search } from 'components/Icons';

import api from 'api';
import notificationsLogic from 'store/notifications';
import { SearchResult } from 'types/common';

interface Props {
  label: string;
  labelSelected: string;
  onSelectResult: (result: SearchResult | null) => void;
  selectedResult: SearchResult | null;
  disabled: boolean;
}

const SearchUser: FC<Props> = ({ onSelectResult, label, labelSelected, selectedResult, disabled }) => {
  const [val, setVal] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [axiosToken, setAxiosToken] = useState<CancelTokenSource | null>(null);
  const { addWarning } = useActions(notificationsLogic);

  const search = (term: string) => {
    setIsLoading(true);
    if (axiosToken) {
      axiosToken.cancel();
    }
    const cancelToken = axios.CancelToken.source();
    setAxiosToken(cancelToken);
    api.commission
      .searchUser(term, cancelToken.token)
      .then((res) => {
        setIsLoading(false);
        setResults(res.usuarios);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsLoading(false);
        addWarning('Oops!', 'Ocurrió un error contactando con el servidor');
      });
  };

  const onSelectItem = (result: SearchResult) => () => {
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
        textSec={`(${selectedResult.codRegistro})`}
        subText={selectedResult.correo}
        onCancel={setNullItem}
        disabled={disabled}
      />
    );
  }

  return (
    <>
      <SingleInput
        id="jury-search-input"
        label={label}
        placeholder="Utilize nombre o codigo"
        endIcon={Search}
        onChangeValue={setVal}
        value={val}
        disabled={disabled}
      />
      <Transition
        show={results.length > 0 || isLoading || val.length > 0}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="relative w-full z-10 transform"
      >
        <div className="absolute w-full rounded-md bg-white shadow-lg overflow-auto" style={{ maxHeight: 280 }}>
          {results.map((result) => (
            <div
              key={result.codRegistro}
              onClick={onSelectItem(result)}
              className="flex flex-col text-gray-800 my-0 hover:bg-gray-300 py-2 px-4 cursor-pointer transition duration-200 rounded-md"
            >
              <p className="text-base">
                {result.nombre}
                <span className="text-gray-600"> ({result.codRegistro})</span>
              </p>
              <span className="text-sm text-gray-600">{result.correo}</span>
            </div>
          ))}
          {isLoading && <div className="text-center italic text-gray-600 py-5 animate-pulse">Buscando...</div>}
          {results.length === 0 && !isLoading && (
            <div className="text-center italic text-gray-600 py-5"> No se encontraron resultados :(</div>
          )}
        </div>
      </Transition>
    </>
  );
};

export default SearchUser;
