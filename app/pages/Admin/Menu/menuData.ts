import { FC } from 'react';

import { Check } from 'components/Icons';
import Activities from 'pages/Admin/Activities';
import GroupMembers from 'pages/Admin/GroupMembers';
import Juries from 'pages/Admin/Juries';
import NewActivity from 'pages/Admin/NewActivity';
import RateActivites from 'pages/Admin/RateActivities';
import RatedActivities from 'pages/Admin/RatedActivities';
import Schedule from 'pages/Admin/Schedule';
import Sponsors from 'pages/Admin/Sponsors';
import Teams from 'pages/Admin/Teams';

import { IconProps } from 'types/common';
import { Roles } from 'store/auth/types';

interface MenuItemData {
  id: number;
  icon: FC<IconProps>;
  title: string;
  component: FC<unknown>;
  subpath: string;
  path: string;
  availableTo: Roles;
}

const menuData: MenuItemData[] = [
  {
    id: 1,
    icon: Check,
    title: 'Ver Actividades',
    component: Activities,
    subpath: '/actividades',
    path: '/admin/actividades',
    availableTo: Roles.Leader,
  },
  {
    id: 2,
    icon: Check,
    title: 'Agregar o Ver Miembros',
    component: GroupMembers,
    subpath: '/miembros',
    path: '/admin/miembros',
    availableTo: Roles.Leader,
  },
  {
    id: 3,
    icon: Check,
    title: 'Asignar Jurados',
    component: Juries,
    subpath: '/jurados',
    path: '/admin/jurados',
    availableTo: Roles.Commission,
  },
  {
    id: 4,
    icon: Check,
    title: 'Crear Actividad',
    component: NewActivity,
    subpath: '/nueva-actividad',
    path: '/admin/nueva-actividad',
    availableTo: Roles.Leader,
  },
  {
    id: 5,
    icon: Check,
    title: 'Calificar Actividades',
    component: RateActivites,
    subpath: '/calificar-actividad',
    path: '/admin/calificar-actividad',
    availableTo: Roles.Jury,
  },
  {
    id: 6,
    icon: Check,
    title: 'Actividades Calificadas',
    component: RatedActivities,
    subpath: '/actividades-calificadas',
    path: '/admin/actividades-calificadas',
    availableTo: Roles.Jury,
  },
  {
    id: 7,
    icon: Check,
    title: 'Organizar Agenda',
    component: Schedule,
    subpath: '/agenda',
    path: '/admin/agenda',
    availableTo: Roles.Commission,
  },
  {
    id: 8,
    icon: Check,
    title: 'Agregar Auspiciadores',
    component: Sponsors,
    subpath: '/auspiciadores',
    path: '/admin/auspiciadores',
    availableTo: Roles.Commission,
  },
  {
    id: 9,
    icon: Check,
    title: 'Crear Equipos',
    component: Teams,
    subpath: '/equipos',
    path: '/admin/equipos',
    availableTo: Roles.Commission,
  },
];

export const getItemsByRole = (role: Roles): MenuItemData[] => menuData.filter((item) => item.availableTo === role);
