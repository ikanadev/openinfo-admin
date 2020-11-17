import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

import Button from 'components/Button';

import { LeaderProject } from 'store/data/types';

interface Props {
  open: boolean;
  project: LeaderProject;
  cancel: () => void;
}

const EditProjectForm: FC<Props> = ({ open, cancel }) => {
  const handleClick = () => {
    //
  };
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full flex"
    >
      <div className="flex-1">
        <Button label="Cancelar" onClick={cancel} full />
      </div>
      <div className="flex-1">
        <Button label="Guardar" onClick={handleClick} full />
      </div>
    </Transition>
  );
};

export default EditProjectForm;
