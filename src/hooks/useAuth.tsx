import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";
import kill_server_session from "helpers/logout";

interface Props {
  children: React.ReactNode;
}

type Context = {
  token: string | null,
  user: string | null,
  authUser: (token: string, user: string) => void,
  logout: () => void
}
export const AuthContext = createContext<Context>({
  token: null,
  user: null,
  authUser: () => { },
  logout: () => { }
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);
  const [user, setUser] = useSessionStorage("user", null)

  const navigate = useNavigate();

  const authUser = async (token: string, user: string) => {
    setToken(token);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    kill_server_session();
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({
    token,
    user,
    authUser,
    logout
  }),
    [token, user]
  );

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}
