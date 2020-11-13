import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import Subtitle from 'components/Subtitle';
import Button from 'components/Button';
import AddMemberForm from './AddMemberForm';

import { LeaderProject } from 'store/data/types';

interface Props {
  open: boolean;
  project: LeaderProject;
}

const Members: FC<Props> = ({ open, project }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full"
    >
      <>
        <Subtitle text="Integrantes" />
        {project.participantes.map((member) => (
          <div
            key={member.usuario.codRegistro}
            className="flex flex-col my-2 text-gray-700 p-2 bg-white shadow-md rounded-md"
          >
            <p>
              <span className="font-semibold">{member.usuario.nombre}</span>
              <span className="text-gray-500"> ({member.usuario.codRegistro})</span>
              <br />
              <span className="italic"> {member.usuario.correo}</span>
            </p>
          </div>
        ))}
        <Transition
          show={showForm}
          enter="transition duration-300"
          enterFrom="transform scale-75 opacity-50"
          enterTo="transform scale-100 opacity-100"
          className="w-full"
        >
          <Button label="Agregar nuevo integrante" onClick={toggleForm} full type="proceed" />
        </Transition>
        <Transition
          show={!showForm}
          enter="transition duration-300"
          enterFrom="transform scale-75 opacity-50"
          enterTo="transform scale-100 opacity-100"
          className="w-full"
        >
          <AddMemberForm onClose={toggleForm} projectID={project.id} />
        </Transition>
      </>
    </Transition>
  );
};

export default Members;
