import CryptoJS from 'crypto-js';

export const c_encrypt = (str: string, key: string) => {
  return CryptoJS.AES.encrypt(str, key).toString();
}

export const c_dcrypt = (str: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(str, key);
  return bytes.toString(CryptoJS.enc.Utf8).toString();
}
