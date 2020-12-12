import NoItemsText from 'components/NoItemsText';
import React, { FC } from 'react';

interface Props {
  items: {
    id: number;
    nombre: string;
    habilitado: boolean;
    linkDrive: string | null;
    linkYoutube: string | null;
  }[];
  onSelectItem: (id: number) => void;
  onSetPrModal: (id: number) => void;
}

const Table: FC<Props> = ({ items, onSelectItem, onSetPrModal }) => {
  const onEdit = (id: number) => () => {
    onSelectItem(id);
  };
  const onView = (id: number) => () => {
    onSetPrModal(id);
  };

  return (
    <div className="shadow-lg overflow-hidden border-gray-200 rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Datos
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
          <tr>
            <td colSpan={3}>
              <NoItemsText text="No hay elementos en esta lista " />
            </td>
          </tr>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-3 py-3 flex flex-col">
                <p className="text-sm font-medium text-gray-800">{item.nombre}</p>
                <p>
                  <span className="text-sm text-gray-700">Video: </span>
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
                <p>
                  <span className="text-sm text-gray-700">Documento: </span>
                  {item.linkDrive ? (
                    <a
                      className="text-sm text-blue-700 hover:underline cursor-pointer"
                      href={item.linkDrive}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.linkDrive}
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
                <span className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer" onClick={onEdit(item.id)}>
                  Editar
                </span>
                <span className="text-green-600 hover:text-green-900 cursor-pointer" onClick={onView(item.id)}>
                  Ver
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
