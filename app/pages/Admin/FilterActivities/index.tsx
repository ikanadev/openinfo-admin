import Button from 'components/Button';
import Title from 'components/Title';
import React, { FC } from 'react';

const FilterActivities: FC = () => {
  const handleClick = () => {
    //
  };
  return (
    <div>
      <Title text="Habilitar o desabilitar actividades" />

      <table className="w-full rounded-lg overflow-hidden shadow-md">
        <thead className="bg-teal-600 text-white">
          <tr>
            <td className="py-1 pl-5">Nombre</td>
            <td>Grupo</td>
            <td>Estado</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 text-gray-600">
            <td className="py-2 pl-5">Proyecto 1</td>
            <td>INF-322</td>
            <td>Deshabilitado</td>
            <td>
              <Button label="Habilitar" type="proceed" onClick={handleClick} />
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 pl-5">Proyecto 2</td>
            <td>Sociedad Cientifica</td>
            <td>Habilitado</td>
            <td>
              <Button label="Inhabilitar" type="cancel" onClick={handleClick} />
            </td>
          </tr>
          <tr className="border-b border-gray-200 text-gray-600">
            <td className="py-2 pl-5">Proyecto Y</td>
            <td>Grupo de Estudio X</td>
            <td>Deshabilitado</td>
            <td>
              <Button label="Habilitar" type="proceed" onClick={handleClick} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilterActivities;
