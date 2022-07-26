import { ezEncode } from "../utils/get_sid";
import axios from "../helpers/axios";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

interface token {
  username: string;
  password: string;
}

interface response {
  data: any;
  error: undefined;
}

const login = async ({ username, password }: token): Promise<response> => {
  const pwd = ezEncode(password);
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}`;

  let data = {};
  let error;

  await axios
    .post(url, JSON.stringify({ username, pwd }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      data = JSON.stringify(response.data);
    })
    .catch((err) => {
      error = err;
    });

  return { data, error };
};

export default login;
