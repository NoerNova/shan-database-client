import { ezEncode, utf16to8 } from "../utils/get_sid";
import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

interface token {
  username: string;
  password: string;
}

interface response {
  data: any;
  error: any;
}

const login = async ({ username, password }: token): Promise<response> => {
  const pwd = ezEncode(utf16to8(password));
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}`;

  let data: any = {};
  let error: any = {};

  try {
    const response = await axios.post(url);
    data = response?.data
  } catch (err) {
    error = err
  }

  return { data, error };
};

export default login;
