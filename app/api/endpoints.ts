export default {
  auth: {
    login: '/oauth/token',
    checkToken: '/oauth/check_token',
  },
  commission: {
    postSponsor: '/openInfo/auspiciadores',
    getSponsors: '/openInfo/auspiciadores',
    searchUser: (term: string): string => `/openInfo/buscarUsuario/${term}`,
    postTeam: `/openInfo/registrarEquipo`,
    getTeams: `/openInfo/equipos`,
    searchProject: (term: string): string => `/openInfo/buscarProyecto/${term}`,
    newJury: '/openInfo/registrarJurado',
    juries: '/openInfo/jurados',
    grade: '/openInfo/registrarNota',
    allActivities: '/openInfo/listaActividades',
    updateActivity: '/openInfo/actualizarProyecto',
  },
  common: {
    projectTypes: '/openInfo/tipoProyectos',
    teamTypes: '/openInfo/tipoEquipo',
  },
  teamLeader: {
    getTeams: (code: string): string => `/openInfo/equiposUsuario/${code}`,
    postProject: '/openInfo/registrarProyecto',
    getProjects: (code: string): string => `/openInfo/proyectosDocente/${code}`,
  },
  projectLeader: {
    getProjects: (code: string): string => `/openInfo/proyectosUsuario/${code}`,
    postNewMember: `/openInfo/agregarParticipante`,
    updateProject: (id: number): string => `/openInfo/actualizarProyecto/${id}`,
  },
};
