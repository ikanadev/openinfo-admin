import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import JuryCard from 'components/JuryCard';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import RateForm from './RateForm';

import { JuryStore } from 'store/data/types';
import juriesLogic from 'store/data/juries';
import authLogic from 'store/auth';

const RateActivites: FC = () => {
  const [juryProject, setJuryProject] = useState<JuryStore | null>(null);

  const { isFetched, isLoading, items } = useValues(juriesLogic);
  const { getItems } = useActions(juriesLogic);

  const { data } = useValues(authLogic);

  useEffect(() => {
    if (items.length > 0) {
      const jury = items.filter((j) => j.usuario.codRegistro === data.username);
      if (jury.length > 0) {
        setJuryProject(jury[0]);
      }
    }
  }, [items]);

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo su lista de proyectos..." />;

  if ((isFetched && items.length === 0) || !juryProject)
    return <NoItemsText text="Ups! parece que no le han asignado ningún proyecto." />;

  if (!isFetched) return <NoItemsText error text="Error obteniendo datos..." />;

  return (
    <div>
      <RateForm projects={juryProject.proyectos.map((p) => p.proyecto)} />
      <Title text="Proyectos" />

      <JuryCard jury={juryProject} />
    </div>
  );
};

export default RateActivites;
