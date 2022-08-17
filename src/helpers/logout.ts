import axios from "axios";

interface responseData {
  status: number,
  success: boolean
}

interface responseError {
  code: string,
  message: string
}

interface response {
  data: responseData,
  error: responseError
}

const LOGOUT_URL = import.meta.env.VITE_LOGOUT_URL;

const kill_server_session = async (): Promise<response> => {

  let data = <responseData>{};
  let error = <responseError>{};


  try {
    const response = await axios.post(LOGOUT_URL);
    data = response?.data
  } catch (err) {
    error = err as responseError
  }

  return { data, error }
}

export default kill_server_session;
