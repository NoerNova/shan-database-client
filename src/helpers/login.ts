import { ezEncode, utf16to8 } from "../utils/get_sid";
import axios from "axios";
import convert from "xml-js";

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
    const xml2json = convert.xml2js(response.data);

    const jsonResponse: [getResponse] = xml2json.elements[0];

    const getNestedObject = (nestedObj: any, pathArr: any[]) => {
      return pathArr.reduce(
        (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
        nestedObj
      );
    };

    const sid =
      jsonResponse[0].elements &&
      jsonResponse[0].elements.filter((element) => element.name === "authSid");
    const username =
      jsonResponse[0].elements &&
      jsonResponse[0].elements.filter((element) => element.name === "username");
    const admingroup =
      jsonResponse[0].elements &&
      jsonResponse[0].elements.filter((element) => element.name === "isAdmin");
    const authPassed =
      jsonResponse[0].elements &&
      jsonResponse[0].elements.filter(
        (element) => element.name === "authPassed"
      );

    data = {
      sid: getNestedObject(sid && sid[0].elements, [0, "cdata"]),
      username: getNestedObject(username && username[0].elements, [0, "cdata"]),
      admingroup: getNestedObject(admingroup && admingroup[0].elements, [
        0,
        "cdata",
      ]),
      authPassed: getNestedObject(authPassed && authPassed[0].elements, [
        0,
        "cdata",
      ]),
    };
  } catch (err) {
    console.log(err);
    error = err as responseError;
  }

  return { data, error };
};

export default login;
