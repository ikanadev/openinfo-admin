import React, { FC } from 'react';
import { useValues, useActions } from 'kea';

import Title from 'components/Title';
import Button from 'components/Button';
import SingleInput from 'components/SingleInput';
import ImageSelector from 'components/ImageSelector';
import SearchUser from 'components/SearchUser';
import SelectedUser from 'components/SelectedUser';
import SelectOption from 'components/SelectOption';
import Progress from 'components/Progress';

import newMemberLogic from 'store/forms/newMember';
import { ItemType } from 'types/common';

const grados: ItemType[] = [
  { id: 1, nombre: 'Estudiante' },
  { id: 2, nombre: 'Lic.' },
  { id: 3, nombre: 'Ms. C.' },
  { id: 4, nombre: 'Dr.' },
  { id: 5, nombre: 'Ph. D.' },
];

interface Props {
  onClose: () => void;
  projectID: number;
}

const AddMemberForm: FC<Props> = ({ onClose, projectID }) => {
  const { form, isLoading, percentUploaded } = useValues(newMemberLogic);
  const {
    setUser,
    setFoto,
    setCI,
    setTelefono,
    setContacto2,
    setContacto3,
    setGradoAc,
    postData,
    setDescripcion,
    setFotoURL,
  } = useActions(newMemberLogic);

  const handleSubmit = () => {
    postData(projectID);
  };
  return (
    <div className="flex">
      <div className="flex-1">
        <Title text="Datos nuevo integrante" />

        <Progress isOpen={isLoading} percent={percentUploaded} title="Guardando" />

        <SearchUser label="Buscar usuario" onSelectResult={setUser} />
        <SelectedUser
          user={form.selectedUser}
          subtitle="Integrante a agregar:"
          noUserText="Busque y seleccione un usuario"
        />

        <div className="flex">
          <div className="flex-1">
            <ImageSelector
              imgUrl={form.fotoURL}
              label="Foto:"
              setFile={setFoto}
              setUrlFile={setFotoURL}
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Grado académico:"
              items={grados}
              selectedItem={form.gradoAcademico}
              setSelectedItem={setGradoAc}
              disabled={isLoading}
            />
            <SingleInput
              id="new-member-ci"
              label="C.I."
              placeholder="Ej. 10255566"
              onChangeValue={setCI}
              value={form.ci}
              disabled={isLoading}
            />
            <SingleInput
              id="new-member-phone"
              label="Telf. o Celular"
              placeholder="Ej. 6654566"
              onChangeValue={setTelefono}
              value={form.telefono}
              disabled={isLoading}
            />
            <SingleInput
              id="new-member-contact-1"
              label="Contacto 1"
              placeholder="Ej. facebook, github, linkedin"
              onChangeValue={setContacto2}
              value={form.contacto2}
              disabled={isLoading}
            />
            <SingleInput
              id="new-member-contact-2"
              label="Contacto 2"
              placeholder="Ej. facebook, github, linkedin"
              onChangeValue={setContacto3}
              value={form.contacto3}
              disabled={isLoading}
            />
          </div>
        </div>

        <SingleInput
          id="new-member-description"
          label="Descripción"
          placeholder="Breve descripción..."
          onChangeValue={setDescripcion}
          value={form.descripcion}
          disabled={isLoading}
        />

        <div className="flex">
          <div className="flex-1 mr-2">
            <Button label="Agregar" onClick={handleSubmit} type="proceed" full disabled={isLoading} />
          </div>
          <div className="flex-1 ml-2">
            <Button label="Cancelar" onClick={onClose} type="cancel" full disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;
