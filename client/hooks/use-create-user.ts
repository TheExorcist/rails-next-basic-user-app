import { useContext } from 'react';
import { useMutation } from 'react-query'
import axios from 'axios'

import ServerConfigsContext from '../contexts/server-configs';

interface UserParams {
  email: string
  password: string
  firstName: string
  lastName: string
  referralCode?: string
}

export default function useCreateUser() {
  const { serverConfigs } = useContext(ServerConfigsContext);

  const mutation = useMutation((newUser: UserParams) => {
    if (newUser.referralCode) {
      return axios.post(`${serverConfigs.baseApiPath}/users/create_user_with_referral_code`, { user: newUser })
    }
    return axios.post(`${serverConfigs.baseApiPath}/users`, { user: newUser })
  });
  return mutation
}
