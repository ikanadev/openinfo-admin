interface Conf {
  // the main endpoint to consume services
  apiUrl: string;
  // duration on notification messages in milliseconds
  notificationDuration: number;
  // client user, for basicAuth request authentication
  clientUser: string;
  // client password, for basicAuth request authentication
  clientPassw: string;
}

const conf: Conf = {
  apiUrl: process.env.API_URL === undefined ? '' : process.env.API_URL,
  notificationDuration: 3800,
  clientUser: process.env.CLIENT_USER === undefined ? '' : process.env.CLIENT_USER,
  clientPassw: process.env.CLIENT_PASSW === undefined ? '' : process.env.CLIENT_PASSW,
};

export default conf;
