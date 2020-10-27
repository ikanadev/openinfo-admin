import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Subtitle from 'components/Subtitle';

import teamsLogic from 'store/data/teams';

const TeamsList: FC = () => {
  const { getItems } = useActions(teamsLogic);
  const { isFetched, isLoading, items } = useValues(teamsLogic);

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo equipos..." />;
  if (isFetched && items.length === 0) return <NoItemsText text="No hay equipos registrados" />;
  if (!isFetched)
    return (
      <NoItemsText text="Se produjo un error obteniendo los equipos, vuelve a visitar este sitio más tarde" error />
    );
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <Subtitle text={item.nombre} />
          {item.equipos.length === 0 && <NoItemsText text={`No hay equipos en ${item.nombre}`} />}
          {item.equipos.map((equipo) => (
            <div key={equipo.idEquipo} className="flex flex-col my-2 text-gray-700 p-2 bg-white shadow-md rounded-md">
              <p>
                <strong>Equipo: </strong>
                <span>{equipo.nombre}</span>
              </p>
              <p>
                <strong>Encargado: </strong>
                <span>{`${equipo.encargado.nombre} (${equipo.encargado.codRegistro})`} </span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default TeamsList;
