import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface Props {
  children: React.ReactNode;
}

type Context = {
  token: string | null,
  authUser: (token: string) => void,
  logout: () => void
}
export const AuthContext = createContext<Context>({
  token: null,
  authUser: () => { },
  logout: () => { }
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const authUser = async (token: string) => {
    setToken(token);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({
    token,
    authUser,
    logout
  }),
    [token]
  );

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}
