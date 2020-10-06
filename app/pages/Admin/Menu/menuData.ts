import {
  Plus,
  Calendar,
  ClipboardCheck,
  ClipboardList,
  UserAdd,
  UserGroup,
  Speakerphone,
  Filter,
} from 'components/Icons';
import Activities from 'pages/Admin/Activities';
import GroupMembers from 'pages/Admin/GroupMembers';
import Juries from 'pages/Admin/Juries';
import NewActivity from 'pages/Admin/NewActivity';
import RateActivities from 'pages/Admin/RateActivities';
import EditActivities from 'pages/Admin/EditActivities';
import Schedule from 'pages/Admin/Schedule';
import Sponsors from 'pages/Admin/Sponsors';
import Teams from 'pages/Admin/Teams';
import FilterActivities from 'pages/Admin/FilterActivities';

import { Roles } from 'store/auth/types';
import { MenuItemData } from 'types/common';

const menuData: MenuItemData[] = [
  {
    id: 1,
    icon: ClipboardList,
    title: 'Ver Actividades',
    component: Activities,
    subpath: '/actividades',
    path: '/admin/actividades',
    availableTo: Roles.Leader,
  },
  {
    id: 2,
    icon: UserGroup,
    title: 'Agregar Miembros',
    component: GroupMembers,
    subpath: '/miembros',
    path: '/admin/miembros',
    availableTo: Roles.LeaderGroup,
  },
  {
    id: 3,
    icon: UserAdd,
    title: 'Asignar Jurados',
    component: Juries,
    subpath: '/jurados',
    path: '/admin/jurados',
    availableTo: Roles.Commission,
  },
  {
    id: 4,
    icon: Plus,
    title: 'Crear Actividad',
    component: NewActivity,
    subpath: '/nueva-actividad',
    path: '/admin/nueva-actividad',
    availableTo: Roles.Leader,
  },
  {
    id: 5,
    icon: ClipboardCheck,
    title: 'Calificar Actividades',
    component: RateActivities,
    subpath: '/calificar-actividad',
    path: '/admin/calificar-actividad',
    availableTo: Roles.Jury,
  },
  // this will not go
  {
    id: 6,
    icon: ClipboardList,
    title: 'Ver Actividades',
    component: EditActivities,
    subpath: '/editar-actividades',
    path: '/admin/editar-actividades',
    availableTo: Roles.LeaderGroup,
  },
  {
    id: 7,
    icon: Calendar,
    title: 'Organizar Agenda',
    component: Schedule,
    subpath: '/agenda',
    path: '/admin/agenda',
    availableTo: Roles.Commission,
  },
  {
    id: 8,
    icon: Speakerphone,
    title: 'Agregar Auspiciadores',
    component: Sponsors,
    subpath: '/auspiciadores',
    path: '/admin/auspiciadores',
    availableTo: Roles.Commission,
  },
  {
    id: 9,
    icon: UserGroup,
    title: 'Crear Equipos',
    component: Teams,
    subpath: '/equipos',
    path: '/admin/equipos',
    availableTo: Roles.Commission,
  },
  {
    id: 10,
    icon: Filter,
    title: 'Filtrar Actividades',
    component: FilterActivities,
    subpath: '/filtrar-actividades',
    path: '/admin/filtrar-actividades',
    availableTo: Roles.Commission,
  },
];

export const getItemsByRole = (role: Roles): MenuItemData[] => menuData.filter((item) => item.availableTo === role);
