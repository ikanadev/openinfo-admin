import React, { FC } from 'react';
import { Transition } from '@headlessui/react';
import { useActions, useValues } from 'kea';

import ProjectDetails from 'components/ProjectDetails';
import EditProjectForm from './EditProjectForm';

import { LeaderProject } from 'store/data/types';
import updateProjectLogic from 'store/forms/updateProject';

interface Props {
  open: boolean;
  project: LeaderProject;
}

const EditActivities: FC<Props> = ({ open, project }) => {
  const { setShowForm } = useActions(updateProjectLogic);
  const { showForm } = useValues(updateProjectLogic);
  const closeForm = () => setShowForm(false);
  const openForm = () => setShowForm(true);
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full relative"
    >
      <ProjectDetails open={!showForm} project={project} onEdit={openForm} />
      <EditProjectForm open={showForm} cancel={closeForm} project={project} />
    </Transition>
  );
};

export default EditActivities;
