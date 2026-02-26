import CryptoJS from "crypto-js";


export function encryptPassword(password : string ,secretKey : string) {
   const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), secretKey).toString();
   return ciphertext;
}


export function decryptPassword(ciphertext: string, secretKey: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
}
