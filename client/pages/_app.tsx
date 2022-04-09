import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";

import { QueryClient, QueryClientProvider } from 'react-query'
import ServerConfigsContext, { data as serverConfig} from '../contexts/server-configs'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    <ServerConfigsContext.Provider value={serverConfig}>
      <Component {...pageProps} />
    </ServerConfigsContext.Provider>
  </QueryClientProvider>

}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});