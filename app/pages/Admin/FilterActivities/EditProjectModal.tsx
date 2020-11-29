import React, { FC } from 'react';
import { useValues, useActions } from 'kea';

import Modal from 'components/Modal';
import adminProjectLogic from 'store/forms/adminProject';
import Title from 'components/Title';
import SingleInput from 'components/SingleInput';
import SwitchC from 'components/Switch';
import siteDataLogic from 'store/data/siteData';
import SelectOption from 'components/SelectOption';
import Button from 'components/Button';

const EditProjectModal: FC = () => {
  const { form, isLoading, showForm } = useValues(adminProjectLogic);
  const { closeForm, setProjectType, setDesc, setHabilitado, setLink, postData } = useActions(adminProjectLogic);

  const { projectTypes } = useValues(siteDataLogic);

  return (
    <Modal open={showForm} onClose={closeForm}>
      <div>
        <Title text={form.project.nombre} />
        <p className="text-gray-600 italic text-sm">
          El enlace de youtube debe estar en modo embed, ej: <span>https://www.youtube.com/embed/XXXXXXX</span>
        </p>
        <SingleInput
          label="Enlace canal Youtube:"
          id="project-youtube-link"
          value={form.linkOficial}
          onChangeValue={setLink}
          placeholder="Ej. https://www.youtube.com/embed/XXXXXXX"
          disabled={isLoading}
        />
        <SingleInput
          label="Enlace informe o tríptico (Drive PDF)"
          id="project-document-link"
          value={form.description}
          onChangeValue={setDesc}
          placeholder="Enlace del informe/tríptico del proyecto"
          disabled={isLoading}
        />
        <SwitchC label="Habilitar?" active={form.habilitado} setActive={setHabilitado} disabled={isLoading} />
        <SelectOption
          label="Categoria proyecto"
          items={projectTypes}
          selectedItem={form.projectType}
          setSelectedItem={setProjectType}
          disabled={isLoading}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button label="Calcelar" onClick={closeForm} disabled={isLoading} full />
          <Button label="Actualizar" onClick={postData} disabled={isLoading} type="proceed" full />
        </div>
      </div>
    </Modal>
  );
};

export default EditProjectModal;
