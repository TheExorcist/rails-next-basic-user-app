import useLocalStorage from "use-local-storage";

interface UserObject {
  email?: string
  firstName?: string
  lastName?: string
  jwt?: string
}

export default function useAuth() {
  const [user, setUser] = useLocalStorage<UserObject>('user', {});
  const jwt = user?.jwt
  const isAuthenticated = !!jwt

  const resetAuth = () => setUser({})

  return {user, setUser, isAuthenticated, jwt, resetAuth} as const
}
