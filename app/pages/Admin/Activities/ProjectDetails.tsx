import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

import Subtitle from 'components/Subtitle';
import { Cross } from 'components/Icons';
import Detail from './Detail';

import { LeaderProject } from 'store/data/types';

interface Props {
  item: LeaderProject | null;
  onClose(): void;
}

const ProjectDetails: FC<Props> = ({ item, onClose }) => {
  return (
    <Transition
      show={!!item}
      enter="transition duration-200"
      enterFrom="transform opacity-0 scale-x-75"
      enterTo="transform opacity-100 scale-x-100"
      leave="transition duration-200"
      leaveFrom="transform opacity-100 scale-x-100"
      leaveTo="transform opacity-0 scale-x-75"
      className="flex-1 ml-6"
    >
      <>
        <div className="flex items-center">
          <div className="flex-1">
            <Subtitle text="Detalles" />
          </div>
          <span
            className="rounded-full cursor-pointer hover:bg-gray-400 w-10 h-10 flex justify-center items-center"
            onClick={onClose}
          >
            <Cross />
          </span>
        </div>
        <h3 className="font-header text-xl text-center">{item?.nombre.toUpperCase()}</h3>
        <Detail name="Descripción:" value={item?.descripcion} />
        <Detail name="Objetivo General:" value={item?.objetivoGeneral} />
        <Detail name="Objetivos específicos:" value={item?.objectivosEspecificos?.join(', ')} />
        <Detail name="Problemática:" value={item?.problematica} />
        <Detail name="Alcance:" value={item?.alcance} />
        <Detail name="Beneficiarios:" value={item?.beneficiarios} />
        <Detail name="Valor Agregado:" value={item?.valorAgregado} />
        <Detail name="Vistas hasta el momento:" value={item?.vistas?.toString()} />
      </>
    </Transition>
  );
};

export default ProjectDetails;
