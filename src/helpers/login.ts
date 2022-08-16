import { ezEncode, utf16to8 } from "../utils/get_sid";
import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

interface token {
  username: string;
  password: string;
}

interface responseData {
  status: number,
  sid: string,
  username: string,
  admingroup: number,
  authPassed: number

}

interface responseError {
  code: string,
  message: string

}

interface response {
  data: responseData,
  error: responseError
}

const login = async ({ username, password }: token): Promise<response> => {
  const pwd = ezEncode(utf16to8(password));
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}`;
  const mockURL = `/login`

  let data = <responseData>{};
  let error = <responseError>{};

  try {
    const response = await axios.post(mockURL, {
      username: username,
      password: pwd
    });
    data = response?.data
  } catch (err) {
    error = err as responseError
  }

  return { data, error };
};

export default login;
