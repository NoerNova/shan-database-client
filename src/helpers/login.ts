import { ezEncode, utf16to8 } from "../utils/get_sid";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

interface token {
  username: string;
  password: string;
}

interface responseData {
  status?: number;
  sid: string;
  username: string;
  admingroup: number;
  authPassed: number;
}

export interface getResponse {
  type: Type;
  name: string;
  elements?: responseElement[];
}

export interface responseElement {
  type: Type;
  cdata?: string;
  name?: string;
  elements?: responseElementClass[];
}

export interface responseElementClass {
  type: Type;
  cdata: string;
}

export enum Type {
  Cdata = "cdata",
  Element = "element",
}
interface responseError {
  code: string;
  message: string;
}

interface response {
  data: responseData;
  error: responseError;
}

const login = async ({ username, password }: token): Promise<response> => {
  const pwd = ezEncode(utf16to8(password));
  const url = `${LOGIN_URL}user=${username}&pwd=${pwd}`;
  //const mock_url = "/login";

  let data = <responseData>{};
  let error = <responseError>{};

  try {
    // const response = await axios.post(mock_url, {
    //   username: username,
    //   password: pwd,
    // });
    const response = await axios.post(url);
    const parser = new XMLParser();
    let jsonData = parser.parse(response.data);

    const sid = jsonData?.QDocRoot.authSid;
    const username = jsonData?.QDocRoot.username;
    const admingroup = jsonData?.QDocRoot.isAdmin;
    const authPassed = jsonData?.QDocRoot.authPassed;

    data = {
      sid: sid,
      username: username,
      admingroup: admingroup,
      authPassed: authPassed,
    };
  } catch (err) {
    console.log(err);
    error = err as responseError;
  }

  return { data, error };
};

export default login;
