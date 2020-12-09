import Modal from 'components/Modal';
import React, { FC } from 'react';
import { LeaderProject, Talk } from 'store/data/types';

interface Props {
  project: LeaderProject | Talk | null;
  open: boolean;
  close: () => void;
}

const isTalk = (pr: LeaderProject | Talk): pr is Talk => {
  return (pr as LeaderProject).area === undefined;
};

const DetailsModal: FC<Props> = ({ open, close, project }) => {
  if (!project) return null;
  return (
    <Modal open={open} onClose={close}>
      <>
        <p className="text-center text-xs text-green-800">{isTalk(project) ? 'Minitalk' : 'Proyecto'}</p>
        <h1 className="text-center text-xl text-green-600 mb-5">{project.nombre}</h1>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-gray-700">
          <p className="col-span-1 text-right">Descripcion: </p>
          <p className="col-span-2 font-light">{project.descripcion}</p>
          <p className="col-span-1 text-right">Link Video: </p>
          {isTalk(project) ? (
            project.video ? (
              <a className="col-span-2 font-light break-all italic text-blue-700" href={project.video}>
                {project.video}
              </a>
            ) : (
              <p className="col-span-2 font-light italic text-base">No definido</p>
            )
          ) : project.linkVideo ? (
            <a className="col-span-2 font-light break-all italic text-blue-700" href={project.linkVideo}>
              {project.linkVideo}
            </a>
          ) : (
            <p className="col-span-2 font-light italic text-base">No definido</p>
          )}
          <p className="col-span-1 text-right">Link canal OpenInfo: </p>
          {project.linkOficial ? (
            <a className="col-span-2 font-light break-all italic text-blue-700" href={project.linkOficial}>
              {project.linkOficial}
            </a>
          ) : (
            <p className="col-span-2 font-light italic text-base">No definido</p>
          )}
        </div>

        {isTalk(project) && (
          <>
            <p className="mt-6 mb-2 uppercase text-center">Datos expositor</p>
            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-gray-700">
              <p className="col-span-1 text-right">Nombre: </p>
              <p className="col-span-2 font-light">{`${project.gradoAcademico} ${project.nombre}`}</p>
              <p className="col-span-1 text-right">Correo: </p>
              <p className="col-span-2 font-light">{project.expositor.correo}</p>
              <p className="col-span-1 text-right">Cod. usuario: </p>
              <p className="col-span-2 font-light">{project.expositor.codRegistro}</p>
              <p className="col-span-1 text-right">Telefono: </p>
              <p className="col-span-2 font-light">{project.telefono}</p>
              <p className="col-span-1 text-right">Institucion:</p>
              <p className="col-span-2 font-light">{project.institucion}</p>
            </div>
          </>
        )}

        {!isTalk(project) && (
          <>
            <p className="mt-6 mb-2 uppercase text-center">Datos adicionales</p>
            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-gray-700">
              <p className="col-span-1 text-right">Materia u organizacion: </p>
              <p className="col-span-2 font-light">{project.equipo.nombre}</p>
              <p className="col-span-1 text-right">Ecargado: </p>
              <p className="col-span-2 font-light">{project.equipo.encargado.nombre}</p>
              <p className="col-span-1 text-right">Correo: </p>
              <p className="col-span-2 font-light">{project.equipo.encargado.correo}</p>
              <p className="col-span-1 text-right">Cod. usuario: </p>
              <p className="col-span-2 font-light">{project.equipo.encargado.codRegistro}</p>
              <p className="col-span-1 text-right">Categoria: </p>
              <p className="col-span-2 font-light">{project.tipoProyecto?.nombre}</p>
            </div>
          </>
        )}
      </>
    </Modal>
  );
};

export default DetailsModal;
