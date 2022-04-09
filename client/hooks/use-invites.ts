import { useContext } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'

import ServerConfigsContext from '../contexts/server-configs';
import useAuth from './use-auth';


export default function useInvites() {
  const { serverConfigs } = useContext(ServerConfigsContext);
  const { jwt } = useAuth();

  const query = useQuery('invites', () => {
    return axios.get(`${serverConfigs.baseApiPath}/invites`, { headers: {
      Authorization: 'Bearer ' + jwt
    }})
  });

  return query
}
