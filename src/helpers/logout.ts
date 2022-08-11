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

const logout = async (): Promise<response> => {
  const url = `https://cloud.shannews.local/cgi-bin/filemanager/wfm2Logout.cgi`;

  let data = <responseData>{};
  let error = <responseError>{};


  try {
    const response = await axios.post(url);
    data = response?.data
  } catch (err) {
    error = err as responseError
  }

  return { data, error }
}

export default logout;
