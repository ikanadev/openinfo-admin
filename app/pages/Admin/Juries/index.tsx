import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import NewJuryForm from './NewJuryForm';
import JuryCard from './JuryCard';

import juriesLogic from 'store/data/juries';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Title from 'components/Title';

const Juries: FC = () => {
  const { isFetched, isLoading, items } = useValues(juriesLogic);
  const { getItems } = useActions(juriesLogic);

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo lista de jurados" />;

  if (!isLoading && !isFetched) return <NoItemsText error text="Error obteniendo jurados del servidor" />;

  return (
    <>
      <NewJuryForm />
      <Title text="Jurados" />
      {isFetched && items.length === 0 && <NoItemsText text="Ups! parece que no hay jurados" />}
      {isFetched && items.length > 0 && items.map((jury) => <JuryCard key={jury.id} jury={jury} />)}
    </>
  );
};

export default Juries;
