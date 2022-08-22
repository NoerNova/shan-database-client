import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";
import kill_server_session from "helpers/logout";

interface Props {
  children: React.ReactNode;
}

type Context = {
  token: string | null,
  credential: string | null,
  user: string | null,
  authUser: (token: string, credential: string, user: string) => void,
  logout: () => void
}
export const AuthContext = createContext<Context>({
  token: null,
  credential: null,
  user: null,
  authUser: () => { },
  logout: () => { }
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);
  const [credential, setCredential] = useSessionStorage("credential", null);
  const [user, setUser] = useSessionStorage("user", null)

  const navigate = useNavigate();

  const authUser = async (token: string, credential: string, user: string) => {
    setToken(token);
    setCredential(credential);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setCredential(null);
    setUser(null);
    kill_server_session();
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({
    token,
    credential,
    user,
    authUser,
    logout
  }),
    [token, credential, user]
  );

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}
