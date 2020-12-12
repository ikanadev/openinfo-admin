import React, { FC } from 'react';
import { useValues, useActions } from 'kea';

import Title from 'components/Title';
import SingleInput from 'components/SingleInput';
import Button from 'components/Button';
import SelectOption from 'components/SelectOption';
import SearchUser from 'components/SearchUser';
import TeamsList from './TeamsList';

import siteDataLogic from 'store/data/siteData';
import teamFormLogic from 'store/forms/team';
import LoaderWithText from 'components/LoaderWithText';

const Teams: FC = () => {
  const { teamTypes } = useValues(siteDataLogic);

  const { form, isLoading } = useValues(teamFormLogic);
  const { setTeamType, setGroupName, setUser, postData } = useActions(teamFormLogic);

  return (
    <div className="flex">
      <div className="flex-1">
        <Title text="Crear Nuevo Equipo" />

        {isLoading && <LoaderWithText text="Creando nuevo equipo..." />}

        <SelectOption
          label="Tipo de equipo:"
          selectedItem={form.selectedTeamType}
          setSelectedItem={setTeamType}
          items={teamTypes}
          disabled={isLoading}
        />

        <SingleInput
          label="Nombre del grupo:"
          placeholder="Ej. INF-113, FullStack, Sociedad Cientif. etc."
          value={form.groupName}
          onChangeValue={setGroupName}
          id="group-name-input"
          disabled={isLoading}
        />

        <div className="mt-1">
          <SearchUser
            label="Buscar encargado"
            labelSelected="Encargado seleccionado"
            onSelectResult={setUser}
            selectedResult={form.selectedUser}
            disabled={isLoading}
          />
          <Button label="Crear Equipo" type="proceed" onClick={postData} full disabled={isLoading} />
        </div>
      </div>
      <div className="flex-1 ml-5">
        <Title text="Equipos Creados" />
        <TeamsList />
      </div>
    </div>
  );
};

export default Teams;
