import React, { FC } from 'react';

import Button from 'components/Button';
import Title from 'components/Title';

const Activities: FC = () => {
  const handleClick = () => {
    //
  };
  return (
    <div>
      <Title text="Calificar Actividades" />

      <table className="w-full rounded-lg overflow-hidden shadow-md">
        <thead className="bg-teal-600 text-white">
          <tr>
            <td className="py-1 pl-5">Actividad</td>
            <td>Encargado</td>
            <td>Enlace</td>
            <td>Nota</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-2 pl-5">Proyecto web medio ambiente</td>
            <td>Daniel Condori</td>
            <td>
              <a href="#" className="text-blue-600">
                Abrir
              </a>
            </td>
            <td>86</td>
            <td>
              <Button label="Participantes" onClick={handleClick} />
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 pl-5">Proyecto web medio ambiente</td>
            <td>Daniel Condori</td>
            <td>
              <a href="#" className="text-blue-600">
                Abrir
              </a>
            </td>
            <td>60</td>
            <td>
              <Button label="Participantes" onClick={handleClick} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
