import { ezEncode, utf16to8 } from "../utils/get_sid";
import axios from "axios";

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
  const pwd = ezEncode(utf16to8(password));
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}`;

  let data = {};
  let error;

  await axios
    .get(url)
    .then((response) => {
      data = JSON.stringify(response.data);
      console.log(data);
    })
    .catch((err) => {
      error = err;
    });

  return { data, error };
};

export default login;
