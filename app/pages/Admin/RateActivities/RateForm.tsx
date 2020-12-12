import React, { FC } from 'react';
import { Transition } from '@headlessui/react';
import { useValues, useActions } from 'kea';

import Button from 'components/Button';
import Title from 'components/Title';
import SelectOption from 'components/SelectOption';
import SingleInput from 'components/SingleInput';
import Subtitle from 'components/Subtitle';

import { ItemType } from 'types/common';
import gradeLogic from 'store/forms/grade';

interface Props {
  projects: ItemType[];
}

const RateForm: FC<Props> = ({ projects }) => {
  const { form, isLoading, isOpen } = useValues(gradeLogic);
  const {
    openForm,
    closeForm,
    setFuncionalidad,
    setImpacto,
    setInnovacion,
    setPresentacion,
    setUX,
    setProject,
    postData,
  } = useActions(gradeLogic);
  return (
    <>
      <Transition show={!isOpen}>
        <Button label="Calificar proyecto" onClick={openForm} type="proceed" />
      </Transition>
      <Transition show={isOpen}>
        <Title text="Calificar proyecto" />
        <SelectOption
          label="Proyecto:"
          items={projects}
          selectedItem={form.project}
          setSelectedItem={setProject}
          disabled={isLoading}
        />
        <Subtitle text="Notas" />
        <p className="text-gray-700">Califique las siguientes áreas sobre 20.</p>
        <div className="grid grid-cols-3 gap-3 xl:grid-cols-5">
          <SingleInput
            label="Innovación"
            placeholder="0-20"
            id="rate-project-innovacion"
            value={form.grades.innovacion}
            onChangeValue={setInnovacion}
            disabled={isLoading}
          />
          <SingleInput
            label="Impacto"
            placeholder="0-20"
            id="rate-project-impacto"
            value={form.grades.impacto}
            onChangeValue={setImpacto}
            disabled={isLoading}
          />
          <SingleInput
            label="Presentación"
            placeholder="0-20"
            id="rate-project-presentacion"
            value={form.grades.presentacion}
            onChangeValue={setPresentacion}
            disabled={isLoading}
          />
          <SingleInput
            label="Funcionalidad"
            placeholder="0-20"
            id="rate-project-funcionalidad"
            value={form.grades.funcionalidad}
            onChangeValue={setFuncionalidad}
            disabled={isLoading}
          />
          <SingleInput
            label="Experiencia de Usuario"
            placeholder="0-20"
            id="rate-project-ux"
            value={form.grades.ux}
            onChangeValue={setUX}
            disabled={isLoading}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={closeForm} label="Cancelar" disabled={isLoading} full />
          <Button type="proceed" onClick={postData} label="Enviar" disabled={isLoading} full />
        </div>
      </Transition>
    </>
  );
};

export default RateForm;
