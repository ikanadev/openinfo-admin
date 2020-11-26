import React, { FC } from 'react';

interface Props {
  items: {
    id: number;
    nombre: string;
    habilitado: boolean;
    link: string | null;
    linkYoutube: string | null;
  }[];
}

const Table: FC<Props> = ({ items }) => {
  return (
    <div className="shadow-lg overflow-hidden border-gray-200 rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Proyecto
            </th>
            <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Videos
            </th>
            <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-3 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-800">{item.nombre}</div>
              </td>
              <td className="px-3 py-3 flex flex-col">
                <p>
                  <span className="text-sm text-gray-700">Link Video: </span>
                  {item.link ? (
                    <a
                      className="text-sm text-blue-700 hover:underline cursor-pointer"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.link}
                    </a>
                  ) : (
                    <span className="text-sm italic text-gray-500">No definido</span>
                  )}
                </p>
                <p>
                  <span className="text-sm text-gray-700">Link Youtube: </span>
                  {item.linkYoutube ? (
                    <a
                      className="text-sm text-blue-700 hover:underline cursor-pointer"
                      href={item.linkYoutube}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.linkYoutube}
                    </a>
                  ) : (
                    <span className="text-sm italic text-gray-500">No definido</span>
                  )}
                </p>
              </td>
              <td className="px-3 py-3 whitespace-nowrap">
                {item.habilitado ? (
                  <span className="px-2 inline-flex text-xs leading-5 rounded-full bg-green-200 text-green-700">
                    Habilitado
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 rounded-full bg-red-200 text-red-700">
                    Inhabilitado
                  </span>
                )}
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                <span className="text-green-600 hover:text-green-900 mr-4">Ver</span>
                <span className="text-indigo-600 hover:text-indigo-900">Editar</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
