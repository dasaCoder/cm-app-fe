import CryptoJS from 'crypto-js';

export const stringToMD5 = (input: string) => {
  return CryptoJS.MD5(input).toString();
};
