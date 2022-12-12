import axios from "axios";

const LOGO_IMAGE_PATH = import.meta.env.VITE_IMAGE_SHAN_LOGO;
const GET_THUMB = import.meta.env.VITE_IMAGE_THUMBNAIL_URL;

interface responseData {
  data: string | { status: number };
}

interface responseError {
  code: string;
  message: string;
}

interface response {
  data: responseData;
  error: responseError;
}

const verifyAuth = async (sid: string): Promise<response> => {
  const url = `${GET_THUMB}&sid=${sid}&path=${LOGO_IMAGE_PATH}&timestamp=${new Date().getTime()}`;
  // const mock_url = "/verify_sid";

  let data = <responseData>{};
  let error = <responseError>{};

  try {
    const response = await axios.get(url);
    data = response?.data;
  } catch (err) {
    error = err as responseError;
  }

  return { data, error };
};

export default verifyAuth;
