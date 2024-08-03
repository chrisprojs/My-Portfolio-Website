import CryptoJS from 'crypto-js';

const SECRET_KEY = 'U2FsdGVkX1/TdqsnZVKI+JSqfQvkoYLaj2gOH4KAQVE';

export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
