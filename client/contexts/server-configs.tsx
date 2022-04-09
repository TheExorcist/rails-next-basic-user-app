import { createContext } from "react";

interface ServerConfigsContextType {
  serverConfigs: {
    baseApiPath: string;
  }
}

export const data = {
  serverConfigs: {
    baseApiPath: 'http://localhost:3001/api/v1',
  }
}

const ServerConfigsContext = createContext<ServerConfigsContextType>(data)
export default ServerConfigsContext;
