import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Table from './Table';

import activitiesLogic from 'store/data/activities';

const FilterActivities: FC = () => {
  const { isFetched, isLoading, concurso, feria, talk } = useValues(activitiesLogic);
  const { getData } = useActions(activitiesLogic);

  useEffect(() => {
    if (!isFetched) getData();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo proyectos y talks" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error obteniendo datos del servidor." />;

  return (
    <div>
      <Title text="Proyectos Concurso" />
      <Table
        items={concurso.map((c) => ({
          id: c.id,
          habilitado: c.habilitado,
          nombre: c.nombre,
          link: c.linkVideo,
          linkYoutube: c.linkOficial,
        }))}
      />
      <Title text="Proyectos Feria" />
      <Table
        items={feria.map((f) => ({
          id: f.id,
          habilitado: f.habilitado,
          nombre: f.nombre,
          link: f.linkVideo,
          linkYoutube: f.linkOficial,
        }))}
      />
      <Title text="Mini Talks" />
      <Table
        items={talk.map((t) => ({
          id: t.id,
          habilitado: t.habilitado,
          nombre: t.nombre,
          link: t.video,
          linkYoutube: t.linkOficial,
        }))}
      />
    </div>
  );
};

export default FilterActivities;
