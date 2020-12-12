import React, { FC, useEffect } from 'react';
import { useValues, useActions } from 'kea';

import newProjectFormLogic from 'store/forms/newProject';
import leaderTeamsLogic from 'store/data/leaderTeams';
import { ProjectType } from 'types/common';

import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import SearchUser from 'components/SearchUser';
import Switch from 'components/Switch';
import SelectOption from 'components/SelectOption';
import SingleInput from 'components/SingleInput';
import Subtitle from 'components/Subtitle';
import Button from 'components/Button';
import Title from 'components/Title';

const NewActivity: FC = () => {
  const { isLoading, isFetched, items } = useValues(leaderTeamsLogic);
  const { getItems } = useActions(leaderTeamsLogic);

  const {
    isLoading: isLoadingForm,
    form: { area, name, selectedTeam, selectedUser },
  } = useValues(newProjectFormLogic);
  const { setUser, setArea, setName, setTeam, postData } = useActions(newProjectFormLogic);

  const setProjectType = (value: boolean) => {
    if (value) {
      setArea(ProjectType.concurso);
      return;
    }
    setArea(ProjectType.feria);
  };

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo sus equipos..." />;
  if (isFetched && items.length === 0) return <NoItemsText text="Ups! parece que no le asignaron en ningún grupo." />;
  if (!isFetched) return <NoItemsText error text="Error cargando sus equipos, inténtelo más tarde" />;
  return (
    <div>
      <Title text="Crear Proyecto" />
      {isLoadingForm && <LoaderWithText text="Registrando nuevo proyecto..." />}
      <Subtitle text="Datos" />
      <SingleInput
        value={name}
        onChangeValue={setName}
        disabled={isLoadingForm}
        label="Titulo"
        id="new-project-input"
        placeholder="Ej. Manejo de luces con IoT, Creacion de un sitio web..."
      />

      <Switch
        active={area === ProjectType.concurso}
        setActive={setProjectType}
        disabled={isLoadingForm}
        label="Participa en el concurso?"
      />

      <div className="mt-1">
        <SearchUser
          label="Buscar encargado"
          labelSelected="Encargado seleccionado"
          onSelectResult={setUser}
          selectedResult={selectedUser}
          disabled={isLoadingForm}
        />
      </div>

      <SelectOption
        label="Equipo"
        items={items.map((i) => ({ id: i.idEquipo, nombre: i.nombre }))}
        selectedItem={selectedTeam}
        setSelectedItem={setTeam}
        disabled={isLoadingForm}
      />

      <Button label="Crear Proyecto" type="proceed" onClick={postData} disabled={isLoadingForm} full />
    </div>
  );
};

export default NewActivity;
