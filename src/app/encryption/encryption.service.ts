import { Injectable } from '@angular/core';

@Injectable()
export class EncryptionService {
  salt : string = "myotawallet";
  ctr= new Uint8Array(16);
  constructor() { 

  }


  private async getKeyFromPassword(password: string) : Promise<CryptoKey> {

    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      this.stringToArrayBuffer(password),
      {"name": "PBKDF2"},
      false,
      ["deriveKey"]);
      const key = await window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            "salt": this.stringToArrayBuffer(this.salt),
            "iterations": 1000,
            "hash": 'SHA-256'
        },
        baseKey,
        {"name": "AES-CBC", "length": 128}, // Key we want
        true,                               // Extrable
        ["encrypt", "decrypt"]              // For new key
        );
  // Derive a key from the password
  return key;

}

public async encrypt(file, password) : Promise<File> {
  const key = await this.getKeyFromPassword(password);
  const reader = new FileReader();
  return new Promise<File> ((resolve,reject)=>{
    reader.onload = async ()=> {
      const iv = window.crypto.getRandomValues(new Uint8Array(16));
      const result = await window.crypto.subtle.encrypt(
          {name: "AES-CBC", iv: iv},
          key,
          new Uint8Array(reader.result)
      );
        const blob = new Blob([iv, new Uint8Array(result)], {type: "application/octet-stream"});
        resolve(new File([blob],"1-27-18.wallet"));
    };
    reader.readAsArrayBuffer(file);
  });
}

public async decrypt(encrypted, password) : Promise<Blob> {
  const key = await this.getKeyFromPassword(password);
//   const decrypted = await window.crypto.subtle.decrypt(
//     {
//         name: "AES-CTR",
//         counter: this.ctr, //The same counter you used to encrypt
//         length: 128, //The same length you used to encrypt
//     },
//     key, //from generateKey or importKey above
//     this.stringToArrayBuffer(encrypted) //ArrayBuffer of the data
// );
// let decryptedArr = new Uint8Array(decrypted);
// return this.arrayBufferToString(decryptedArr);
const reader = new FileReader();
return new Promise<Blob>((resolve,reject)=>{
  reader.onload = async () =>{
    const iv = new Uint8Array(reader.result.slice(0, 16));
    const result = await window.crypto.subtle.decrypt(
        {name: "AES-CBC", iv: iv},
        key,
        new Uint8Array(reader.result.slice(16))
    );  
    resolve(new Blob([new Uint8Array(result)], {type: "application/octet-stream"}));
};
reader.readAsArrayBuffer(encrypted);
});

}

private arrayBufferToString(buffer: Uint8Array) : string{
  const decoder =  new TextDecoder();
  return decoder.decode(buffer);
}
private stringToArrayBuffer(string:string) : Uint8Array {
  var encoder = new TextEncoder();
        return encoder.encode(string);
}
}
