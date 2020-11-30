import React, { FC, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Table from './Table';
import EditProjectModal from './EditProjectModal';

import activitiesLogic from 'store/data/activities';
import adminProjectLogic from 'store/forms/adminProject';
import { ProjectType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';

const FilterActivities: FC = () => {
  const { isFetched, isLoading, concurso, feria, talk } = useValues(activitiesLogic);
  const { getData } = useActions(activitiesLogic);

  const { openForm, setForm } = useActions(adminProjectLogic);

  const selectContestProject = (id: number) => {
    const project = concurso.find((c) => c.id === id);
    if (project) {
      setForm({
        project: {
          id: project.id,
          nombre: project.nombre,
        },
        area: project.area,
        areaProyecto: project.area,
        projectType: project.tipoProyecto || DEFAULT_OPTION,
        description: project.descripcion || '',
        habilitado: project.habilitado,
        linkOficial: project.linkOficial || '',
      });
    }
  };

  const selectFairProject = (id: number) => {
    const project = feria.find((f) => f.id === id);
    if (project) {
      setForm({
        project: {
          id: project.id,
          nombre: project.nombre,
        },
        area: project.area,
        areaProyecto: project.area,
        projectType: project.tipoProyecto || DEFAULT_OPTION,
        description: project.descripcion || '',
        habilitado: project.habilitado,
        linkOficial: project.linkOficial || '',
      });
    }
  };

  const selectTalk = (id: number) => {
    const mtalk = talk.find((t) => t.id === id);
    if (mtalk) {
      setForm({
        project: {
          id: mtalk.id,
          nombre: mtalk.nombre,
        },
        area: ProjectType.talk,
        areaProyecto: ProjectType.talk,
        projectType: DEFAULT_OPTION,
        description: mtalk.descripcion || '',
        habilitado: mtalk.habilitado,
        linkOficial: mtalk.linkOficial || '',
      });
    }
  };

  const selectItem = (type: ProjectType) => (id: number) => {
    switch (type) {
      case ProjectType.concurso:
        selectContestProject(id);
        break;
      case ProjectType.feria:
        selectFairProject(id);
        break;
      case ProjectType.talk:
        selectTalk(id);
        break;
      default:
        break;
    }
    openForm();
  };

  useEffect(() => {
    if (!isFetched) getData();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo proyectos y talks" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error obteniendo datos del servidor." />;

  return (
    <div>
      <EditProjectModal />
      <Title text="Proyectos Concurso" />
      <Table
        onSelectItem={selectItem(ProjectType.concurso)}
        items={concurso.map((c) => ({
          id: c.id,
          habilitado: c.habilitado,
          nombre: c.nombre,
          linkDrive: c.descripcion,
          linkYoutube: c.linkOficial,
        }))}
      />
      <Title text="Proyectos Feria" />
      <Table
        onSelectItem={selectItem(ProjectType.feria)}
        items={feria.map((f) => ({
          id: f.id,
          habilitado: f.habilitado,
          nombre: f.nombre,
          linkDrive: f.descripcion,
          linkYoutube: f.linkOficial,
        }))}
      />
      <Title text="Mini Talks" />
      <Table
        onSelectItem={selectItem(ProjectType.talk)}
        items={talk.map((t) => ({
          id: t.id,
          habilitado: t.habilitado,
          nombre: t.nombre,
          linkDrive: t.descripcion,
          linkYoutube: t.linkOficial,
        }))}
      />
    </div>
  );
};

export default FilterActivities;
