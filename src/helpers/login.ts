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
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}&remme=0&remote_ip=192.168.0.161&device=shanadmin`;

  let data = {};
  let error;

  try {
    const response = await axios.post(
      url,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    data = response?.data
  } catch (err) {
    error = err
  }

  error ? console.log(error) : console.log(data)

  return { data, error };
};

export default login;
