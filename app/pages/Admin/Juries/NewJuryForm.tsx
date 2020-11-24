import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useValues, useActions } from 'kea';

import Button from 'components/Button';

import newJuryLogic from 'store/forms/newJury';
import { GRADOS } from 'utils/const';
import Title from 'components/Title';
import SearchUser from 'components/SearchUser';
import SelectOption from 'components/SelectOption';
import SearchProject from 'components/SearchProject';
import SingleInput from 'components/SingleInput';

const NewJuryForm: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const { form, isLoading } = useValues(newJuryLogic);
  const { postData, setGrado, setProject, setTelf, setUser } = useActions(newJuryLogic);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <Transition show={!showForm}>
        <Button label="Nuevo Jurado" onClick={toggleForm} type="proceed" />
      </Transition>
      <Transition show={showForm}>
        <>
          <Title text="Registrar nuevo jurado" />

          <SearchUser
            label="Buscar jurado"
            labelSelected="Jurado seleccionado"
            onSelectResult={setUser}
            selectedResult={form.user}
            disabled={isLoading}
          />

          <SelectOption
            label="Grado académico"
            items={GRADOS}
            selectedItem={form.gradoAcademico}
            setSelectedItem={setGrado}
            disabled={isLoading}
          />

          <SearchProject
            label="Buscar proyecto"
            labelSelected="Proyecto seleccionado"
            onSelectResult={setProject}
            selectedResult={form.project}
            disabled={isLoading}
          />

          <SingleInput
            id="new-jury-phone"
            label="Teléfono"
            value={form.telefono}
            onChangeValue={setTelf}
            placeholder="Número de contacto"
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button label="Cancelar" onClick={toggleForm} full disabled={isLoading} />
            <Button label="Guardar" onClick={postData} full disabled={isLoading} type="proceed" />
          </div>
        </>
      </Transition>
    </>
  );
};

export default NewJuryForm;
