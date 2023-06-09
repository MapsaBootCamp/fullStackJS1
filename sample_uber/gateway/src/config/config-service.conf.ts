export class GateWayConfig {
  private envConfig: { [key: string]: any } = {};
  constructor() {
    this.envConfig.gateway = { port: process.env.GATEWAY_SERVICE_PORT };
    this.envConfig.trip = {
      options: {
        port: process.env.TRIP_SERVICE_PORT,
        host: process.env.TRIP_SERVICE_HOST,
      },
    };
    this.envConfig.user = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST,
      },
    };
    this.envConfig.logger = {
      options: {
        port: process.env.LOGGER_SERVICE_PORT,
        host: process.env.LOGGER_SERVICE_HOST,
      },
    };
    this.envConfig.map = {
      options: {
        port: process.env.MAP_SERVICE_PORT,
        host: process.env.MAP_SERVICE_HOST,
      },
    };
  }

  get(keyName: string) {
    return this.envConfig[keyName];
  }
}
