import React, { FC, useState } from 'react';

import { Check, CaretDown, CaretUp } from 'components/Icons';

import { JuryStore } from 'store/data/types';

interface Props {
  jury: JuryStore;
}

const JuryCard: FC<Props> = ({ jury }) => {
  const [showProyects, setShowProjects] = useState(false);

  const toggleShowProjects = () => setShowProjects((prev) => !prev);

  return (
    <div className="bg-white shadow-md overflow-hidden rounded-lg my-4">
      <div
        className="px-4 py-4 sm:px-6 flex items-center hover:bg-gray-100 cursor-pointer"
        onClick={toggleShowProjects}
      >
        <div className="flex-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {jury.gradoAcademico} {jury.usuario.nombre} ({jury.usuario.codRegistro})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {jury.telefono} - {jury.usuario.correo}
          </p>
        </div>
        <span>{!showProyects ? <CaretDown size={35} /> : <CaretUp size={35} />}</span>
      </div>
      {showProyects && (
        <div className="border-t border-gray-200">
          <dl>
            {jury.proyectos.map((pr, index) => (
              <div
                key={pr.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} px-6 py-5 grid grid-cols-3 gap-2`}
              >
                <dt className="text-sm font-medium text-gray-600">Proyecto:</dt>
                <dd className="text-sm text-gray-900 col-span-2">{pr.proyecto.nombre}</dd>
                <dt className="text-sm font-medium text-gray-600">Tipo:</dt>
                <dd className="text-sm text-gray-900 col-span-2">{pr.proyecto.tipoProyecto?.nombre}</dd>
                <dt className="text-sm font-medium text-gray-600">Grupo o Materia:</dt>
                <dd className="text-sm text-gray-900 col-span-2">{pr.proyecto.equipo.nombre}</dd>
                <dt className="text-sm font-medium text-gray-600">Descripción:</dt>
                <dd className="text-sm text-gray-900 mt-0 col-span-2">{pr.proyecto.descripcion}</dd>
                <dt className="text-sm font-medium text-gray-600">Evaluación:</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  <ul className="border border-gray-300 rounded-md divide-y divide-gray-300 text-gray-700">
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center text-blue-600">
                        <Check />
                        <span className="ml-2 flex-1 w-0 truncate">Innovacion</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 font-medium text-lg">
                        {pr.innovacion === null ? 'Sin calificar' : pr.innovacion.toString()}
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center text-blue-600">
                        <Check />
                        <span className="ml-2 flex-1 w-0 truncate">Impacto</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 font-medium text-lg">
                        {pr.impacto === null ? 'Sin calificar' : pr.impacto.toString()}
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center text-blue-600">
                        <Check />
                        <span className="ml-2 flex-1 w-0 truncate">Funcionalidad</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 font-medium text-lg">
                        {pr.funcionalidad === null ? 'Sin calificar' : pr.funcionalidad.toString()}
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center text-blue-600">
                        <Check />
                        <span className="ml-2 flex-1 w-0 truncate">Experiencia de Usuario</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 font-medium text-lg">
                        {pr.ux === null ? 'Sin calificar' : pr.ux.toString()}
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center text-blue-600">
                        <Check />
                        <span className="ml-2 flex-1 w-0 truncate">Presentacion</span>
                      </div>
                      <div className="ml-4 flex-shrink-0 font-medium text-lg">{pr.presentacion || 'Sin calificar'}</div>
                    </li>
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
};

export default JuryCard;
