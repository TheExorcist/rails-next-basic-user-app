import { createContext } from "react";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { baseUrl } = publicRuntimeConfig

interface ServerConfigsContextType {
  serverConfigs: {
    baseApiPath: string;
  }
}

export const data = {
  serverConfigs: {
    baseApiPath: `http://${baseUrl}/api/v1`,
  }
}

console.log(baseUrl)

const ServerConfigsContext = createContext<ServerConfigsContextType>(data)
export default ServerConfigsContext;
