import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import ProjectDetails from 'components/ProjectDetails';
import EditProjectForm from './EditProjectForm';

import { LeaderProject } from 'store/data/types';

interface Props {
  open: boolean;
  project: LeaderProject;
}

const EditActivities: FC<Props> = ({ open, project }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full relative"
    >
      <ProjectDetails open={!isEditing} project={project} onEdit={toggleEdit} />
      <EditProjectForm open={isEditing} cancel={toggleEdit} project={project} />
    </Transition>
  );
};

export default EditActivities;
