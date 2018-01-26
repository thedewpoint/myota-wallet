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
        {"name": "AES-CTR", "length": 128}, // Key we want
        true,                               // Extrable
        ["encrypt", "decrypt"]              // For new key
        );
  // Derive a key from the password
  return key;

}

public async encrypt(json, password) : Promise<string> {
  const key = await this.getKeyFromPassword(password);
  let encrypted  = await window.crypto.subtle.encrypt(
    {
        name: "AES-CTR",
        //Don't re-use counters!
        //Always use a new counter every time your encrypt!
        counter: this.ctr,
        length: 128, //can be 1-128
    },
    key, //from generateKey or importKey above
    this.stringToArrayBuffer(JSON.stringify(json)) //ArrayBuffer of data you want to encrypt
);
  let newencrypted = new Uint8Array(encrypted);
  return this.arrayBufferToString(newencrypted);
}

public async decrypt(encrypted, password) : Promise<string> {
  const key = await this.getKeyFromPassword(password);
  const decrypted = await window.crypto.subtle.decrypt(
    {
        name: "AES-CTR",
        counter: this.ctr, //The same counter you used to encrypt
        length: 128, //The same length you used to encrypt
    },
    key, //from generateKey or importKey above
    this.stringToArrayBuffer(encrypted) //ArrayBuffer of the data
);
let decryptedArr = new Uint8Array(decrypted);
return this.arrayBufferToString(decryptedArr);
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
