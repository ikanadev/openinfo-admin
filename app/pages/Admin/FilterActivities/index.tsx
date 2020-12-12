import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Table from './Table';
import EditProjectModal from './EditProjectModal';
import DetailsModal from './DetailModal';

import activitiesLogic from 'store/data/activities';
import adminProjectLogic from 'store/forms/adminProject';
import { ProjectType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';
import { LeaderProject, Talk } from 'store/data/types';

const FilterActivities: FC = () => {
  const [tab, setTab] = useState(ProjectType.feria);
  const [title, setTitle] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedPr, setSelectedPr] = useState<LeaderProject | Talk | null>(null);

  const { isFetched, isLoading, concurso, feria, talk } = useValues(activitiesLogic);
  const { getData } = useActions(activitiesLogic);

  const { openForm, setForm } = useActions(adminProjectLogic);

  const closeModal = () => setShowModal(false);
  const setProjectModal = (type: ProjectType) => (id: number) => {
    let pr: LeaderProject | Talk | null = null;
    switch (type) {
      case ProjectType.concurso:
        pr = concurso.find((c) => c.id === id) || null;
        break;
      case ProjectType.feria:
        pr = feria.find((f) => f.id === id) || null;
        break;
      case ProjectType.talk:
        pr = talk.find((t) => t.id === id) || null;
        break;
      default:
        break;
    }
    setSelectedPr(pr);
    setShowModal(true);
  };

  const selectProject = (id: number, type: ProjectType) => {
    let project: LeaderProject | undefined = undefined;
    if (type === ProjectType.feria) {
      project = feria.find((f) => f.id === id);
    } else {
      project = concurso.find((c) => c.id === id);
    }
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
        selectProject(id, ProjectType.concurso);
        break;
      case ProjectType.feria:
        selectProject(id, ProjectType.feria);
        break;
      case ProjectType.talk:
        selectTalk(id);
        break;
      default:
        break;
    }
    openForm();
  };

  const setTabType = (type: ProjectType) => () => setTab(type);

  useEffect(() => {
    switch (tab) {
      case ProjectType.feria:
        setTitle('Proyectos feria');
        break;
      case ProjectType.concurso:
        setTitle('Proyectos concurso');
        break;
      case ProjectType.talk:
        setTitle('Minitalks');
        break;
      default:
        break;
    }
  }, [tab]);

  useEffect(() => {
    if (!isFetched) getData();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo proyectos y talks" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error obteniendo datos del servidor." />;

  return (
    <div>
      <EditProjectModal />
      <DetailsModal open={showModal} close={closeModal} project={selectedPr} />
      <div className="p-2 px-8 mb-4">
        <div className="grid grid-cols-3 gap-4 text-gray-500 font-header">
          <button
            className={`${
              tab === ProjectType.feria
                ? 'bg-teal-600 text-white shadow-md -mt-1'
                : 'bg-gray-400 transform hover:shadow-md hover:-translate-y-1 transition duration-200'
            } py-2 text-lg rounded-md font-semibold tracking-wide`}
            onClick={setTabType(ProjectType.feria)}
          >
            PROYECTOS FERIA
          </button>
          <button
            className={`${
              tab === ProjectType.concurso
                ? 'bg-teal-600 text-white shadow-md -mt-1'
                : 'bg-gray-400 transform hover:shadow-md hover:-translate-y-1 transition duration-200'
            } py-2 text-lg rounded-md font-semibold tracking-wide`}
            onClick={setTabType(ProjectType.concurso)}
          >
            PROYECTOS CONCURSO
          </button>
          <button
            className={`${
              tab === ProjectType.talk
                ? 'bg-teal-600 text-white shadow-md -mt-1'
                : 'bg-gray-400 transform hover:shadow-md hover:-translate-y-1 transition duration-200'
            } py-2 text-lg rounded-md font-semibold tracking-wide`}
            onClick={setTabType(ProjectType.talk)}
          >
            MINITALKS
          </button>
        </div>
      </div>
      <Title text={title} />
      {tab === ProjectType.concurso && (
        <Table
          onSelectItem={selectItem(ProjectType.concurso)}
          onSetPrModal={setProjectModal(ProjectType.concurso)}
          items={concurso.map((c) => ({
            id: c.id,
            habilitado: c.habilitado,
            nombre: c.nombre,
            linkDrive: c.descripcion,
            linkYoutube: c.linkOficial,
          }))}
        />
      )}
      {tab === ProjectType.feria && (
        <Table
          onSelectItem={selectItem(ProjectType.feria)}
          onSetPrModal={setProjectModal(ProjectType.feria)}
          items={feria.map((f) => ({
            id: f.id,
            habilitado: f.habilitado,
            nombre: f.nombre,
            linkDrive: f.descripcion,
            linkYoutube: f.linkOficial,
          }))}
        />
      )}
      {tab === ProjectType.talk && (
        <Table
          onSelectItem={selectItem(ProjectType.talk)}
          onSetPrModal={setProjectModal(ProjectType.talk)}
          items={talk.map((t) => ({
            id: t.id,
            habilitado: t.habilitado,
            nombre: t.nombre,
            linkDrive: t.descripcion,
            linkYoutube: t.linkOficial,
          }))}
        />
      )}
    </div>
  );
};

export default FilterActivities;
