import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'

import ServerConfigsContext from '../contexts/server-configs';
import useAuth from './use-auth';


export default function useInvite(referralCode: string) {
  const { serverConfigs } = useContext(ServerConfigsContext);
  const { jwt } = useAuth();

  const query = useQuery(['referral_code', referralCode], (referralCode) => {
    const queryParams = referralCode.queryKey.join('=')
    if (!queryParams) return

    return axios.get(`${serverConfigs.baseApiPath}/invites/get_invite?${queryParams}`, { headers: {
      Authorization: 'Bearer ' + jwt
    }})
  });

  return query
}
