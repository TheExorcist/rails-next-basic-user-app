import { useContext } from 'react';
import { useMutation } from 'react-query'
import axios from 'axios'

import ServerConfigsContext from '../contexts/server-configs';

interface UserSigninParams {
  email: string
  password: string
}

export default function useUserHooks() {
  const { serverConfigs } = useContext(ServerConfigsContext);

  const mutation = useMutation((userParams: UserSigninParams) => {
    return axios.post(`${serverConfigs.baseApiPath}/users/sign_in`, { user: userParams })
  });

  return mutation
}
