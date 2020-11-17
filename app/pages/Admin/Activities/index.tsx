import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import NoItemsText from 'components/NoItemsText';
import LoaderWithText from 'components/LoaderWithText';
import ProjectDetails from 'components/ProjectDetails';

import { LeaderProject } from 'store/data/types';
import leaderProjectsLogic from 'store/data/leaderProjects';

const Activities: FC = () => {
  const [selectedProject, setSelectedProject] = useState<LeaderProject | null>(null);
  const { isFetched, isLoading, items } = useValues(leaderProjectsLogic);
  const { getItems } = useActions(leaderProjectsLogic);

  const selectProject = (project: LeaderProject) => () => {
    setSelectedProject(project);
  };

  useEffect(() => {
    if (!isFetched) getItems();
    if (isFetched) {
      if (items.length > 0) {
        setSelectedProject(items[0]);
      }
    }
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo sus proyectos..." />;
  if ((isFetched && items.length === 0) || selectedProject === null)
    return <NoItemsText text="Ups! parece que aún no hay proyectos." />;
  if (!isFetched) return <NoItemsText error text="Error cargando sus proyectos, inténtelo más tarde" />;
  return (
    <div>
      <Title text="Proyectos" />

      <div className="mb-3">
        <table className="w-full rounded-lg overflow-hidden shadow-md">
          <thead className="bg-teal-600 text-white">
            <tr>
              <td className="py-1 pl-5">Actividad</td>
              <td className="pr-5">Encargado</td>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className={`${
                  !!selectedProject && selectedProject.id === item.id ? 'font-semibold shadow-inner' : 'font-normal'
                } border-b bg-white border-gray-200 cursor-pointer hover:bg-gray-200 transition duration-200`}
                onClick={selectProject(item)}
              >
                <td className="py-2 pl-5">{item.nombre}</td>
                <td className="pr-5">{item.participantes[0].usuario.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProjectDetails open project={selectedProject} />
    </div>
  );
};

export default Activities;
