import { useState } from "react";

interface userTokenProps {
  token: string;
}

export default function useToken() {
  const getToken = () => {
    const tokenString: string | null = localStorage.getItem("token");
    const userToken: userTokenProps = JSON.parse(tokenString!);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: userTokenProps) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
