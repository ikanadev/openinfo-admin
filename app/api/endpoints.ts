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
  },
  common: {
    projectTypes: '/openInfo/tipoProyectos',
    teamTypes: '/openInfo/tipoEquipo',
  },
};
