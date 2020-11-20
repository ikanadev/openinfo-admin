import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

import Detail from 'components/Detail';
import Subtitle from 'components/Subtitle';
import { Pencil } from 'components/Icons';

import { LeaderProject } from 'store/data/types';
import { getImgURL } from 'utils/function';

interface Props {
  open: boolean;
  project: LeaderProject;
  onEdit?: () => void;
}

const ProjectDetails: FC<Props> = ({ open, project, onEdit }) => {
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full relative mt-10"
    >
      <div
        className={`${
          onEdit === undefined && 'hidden'
        } absolute top-0 right-0 text-gray-600 hover:underline cursor-pointer text-lg`}
        onClick={onEdit}
      >
        <p className="flex items-center">
          Editar
          <span className="ml-2">
            <Pencil />
          </span>
        </p>
      </div>
      <Subtitle text="Detalles Proyecto" />
      <Detail name="Nombre:" value={project.nombre} />
      <Detail name="Participa en:" value={project.area} />
      <p className="my-2 flex">
        <span className="font-medium">Link Video:</span>
        {project.linkVideo ? (
          <a href={project.linkVideo}>{project.linkVideo}</a>
        ) : (
          <span className="italic opacity-75 ml-4 flex-1">(No definido)</span>
        )}
      </p>
      <Detail name="Descripción:" value={project.descripcion} />
      <Detail name="Objetivo general:" value={project.objetivoGeneral} />
      <Detail name="Objetivos específicos:" value={project.objetivosEspecificos.length === 0 ? '' : ' '} />
      <ul className="pb-2">
        {project.objetivosEspecificos.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
      <Detail name="Alcance:" value={project.alcance} />
      <Detail name="Beneficiaris:" value={project.beneficiarios} />
      <Detail name="Problemática:" value={project.problematica} />
      <Detail name="Valor agregado:" value={project.valorAgregado} />
      <p className="font-medium">Banner:</p>
      {project.banner ? (
        <img className="max-w-full h-auto rounded-md" src={getImgURL(project.banner)} alt="" />
      ) : (
        <p className="italic opacity-75 flex-1 text-center">(Sin Banner)</p>
      )}
    </Transition>
  );
};

export default ProjectDetails;
