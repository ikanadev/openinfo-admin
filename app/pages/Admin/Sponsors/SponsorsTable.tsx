import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import Loader from 'components/CircleLoader';

import sponsorsLogic from 'store/data/sponsors';

const SponsorsTable: FC = () => {
  const { isLoading, isFetched, items } = useValues(sponsorsLogic);
  const { getItems } = useActions(sponsorsLogic);

  useEffect(() => {
    if (!isFetched) {
      getItems();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Loader size={30} />
        <span className="text-sm italic text-gray-600 animate-pulse">Cargando...</span>
      </div>
    );
  }
  if (!isLoading && items.length === 0) {
    return (
      <div className="my-5">
        <p className="text-center text-base text-gray-500 italic">Aún no hay auspiciadores registrados</p>
      </div>
    );
  }
  return (
    <div className="flex mb-10">
      <table className="w-full rounded-md overflow-hidden shadow-lg bg-white">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="border text-left px-6 py-2">Nombre</th>
            <th className="border text-left px-6 py-2">Sito web</th>
            <th className="border text-left px-6 py-2">Contacto</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items.map((item) => (
            <tr key={item.id} className="boder-b border-gray-200">
              <td className="border px-6 py-2">{item.nombre}</td>
              <td className="border px-6 py-2">
                <a href="#" className="text-blue-600">
                  {item.link}
                </a>
              </td>
              <td className="border px-6 py-2">{item.contacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SponsorsTable;
