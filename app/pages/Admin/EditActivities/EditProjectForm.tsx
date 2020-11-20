import React, { FC, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useValues, useActions } from 'kea';

import Button from 'components/Button';
import SingleInput from 'components/SingleInput';
import SelectOption from 'components/SelectOption';
import { MinusCircle } from 'components/Icons';
import ImageSelector from 'components/ImageSelector';
import Progress from 'components/Progress';
import Title from 'components/Title';

import { LeaderProject } from 'store/data/types';
import updateProjectLogic from 'store/forms/updateProject';
import siteDataLogic from 'store/data/siteData';
import { DEFAULT_OPTION } from 'utils/const';
import { getImgURL } from 'utils/function';

interface Props {
  open: boolean;
  project: LeaderProject;
  cancel: () => void;
}

const EditProjectForm: FC<Props> = ({ open, cancel, project }) => {
  const { projectTypes } = useValues(siteDataLogic);
  const { form, isLoading, percentUploaded } = useValues(updateProjectLogic);
  const {
    setData,
    setNombre,
    setTipoProyecto,
    setObjetivoGeneral,
    setProblematica,
    setAlcance,
    setBeneficiarios,
    setValorAgregado,
    setDescripcion,
    setLinkVideo,
    setObjectives,
    setBanner,
    setFile,
    postData,
  } = useActions(updateProjectLogic);

  const handleObjectiveChange = (index: number) => (value: string) => {
    setObjectives(
      form.objetivosEspecificos.map((o, i) => {
        if (i === index) return value;
        return o;
      }),
    );
  };

  const addEmptyOption = () => {
    setObjectives([...form.objetivosEspecificos, '']);
  };

  const removeOption = (index: number) => () => {
    setObjectives(form.objetivosEspecificos.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setData(project);
    if (project.objetivosEspecificos.length === 0) {
      addEmptyOption();
    }
    if (project.banner) {
      setBanner(getImgURL(project.banner));
    }
  }, [project]);
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full my-6"
    >
      <Title text="Editar datos proyecto" />
      <Progress isOpen={isLoading} percent={percentUploaded} title="Actualizando datos..." />
      <form className="w-full mt-4">
        <SingleInput
          value={form.nombre}
          onChangeValue={setNombre}
          label="Titulo proyecto:"
          id="update-project-name"
          placeholder=""
        />
        <SingleInput
          value={form.linkVideo || ''}
          onChangeValue={setLinkVideo}
          label="Url Video:"
          id="update-project-link-video"
          placeholder=""
        />
        <SelectOption
          label="Tipo de Proyecto:"
          items={projectTypes}
          selectedItem={form.tipoProyecto || DEFAULT_OPTION}
          setSelectedItem={setTipoProyecto}
        />
        <SingleInput
          value={form.objetivoGeneral || ''}
          onChangeValue={setObjetivoGeneral}
          label="Objetivo General:"
          id="update-project-general-objective"
          placeholder=""
          multiple
        />
        {form.objetivosEspecificos.map((objE, i) => (
          <div key={i} className="flex items-center">
            <div className="flex-1">
              <SingleInput
                value={objE}
                onChangeValue={handleObjectiveChange(i)}
                label={`Objetivo Específico ${i + 1}:`}
                id={`update-project-objective-${i + 1}`}
                placeholder=""
              />
            </div>
            <span className="text-red-600 cursor-pointer" onClick={removeOption(i)}>
              <MinusCircle size={30} />
            </span>
          </div>
        ))}
        <Button label="Agregar Objetivo Específico" full onClick={addEmptyOption} />
        <SingleInput
          value={form.problematica || ''}
          onChangeValue={setProblematica}
          label="Problemática:"
          id="update-project-background"
          placeholder=""
          multiple
        />
        <SingleInput
          value={form.alcance || ''}
          onChangeValue={setAlcance}
          label="Alcance:"
          id="update-project-alcance"
          placeholder=""
          multiple
        />
        <SingleInput
          value={form.beneficiarios || ''}
          onChangeValue={setBeneficiarios}
          label="Beneficiarios:"
          id="update-project-beneficiarios"
          placeholder=""
          multiple
        />
        <SingleInput
          value={form.valorAgregado || ''}
          onChangeValue={setValorAgregado}
          label="Valor Agregado:"
          id="update-project-valor-agregado"
          placeholder=""
          multiple
        />
        <SingleInput
          value={form.descripcion || ''}
          onChangeValue={setDescripcion}
          label="Descripción:"
          id="update-project-description"
          placeholder=""
          multiple
        />
        <ImageSelector
          imgUrl={form.banner || ''}
          label="Banner o imagen del proyecto:"
          setFile={setFile}
          setUrlFile={setBanner}
        />
        <div className="flex">
          <div className="flex-1">
            <Button label="Cancelar" onClick={cancel} full />
          </div>
          <div className="flex-1">
            <Button label="Guardar" type="proceed" onClick={postData} full />
          </div>
        </div>
      </form>
    </Transition>
  );
};

export default EditProjectForm;
