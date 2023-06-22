import * as CryptoJS from "crypto-js";
import { envConfig } from "../config";
import { logger } from "./logger";

export interface IStorageJson {
  getItemJson: <T>(key: string) => T | null;
  setItemJson: <T>(key: string, value: T) => void;
}

export class SecuritySessionStorage implements Storage, IStorageJson {
  [key: string]: any;

  get length(): number {
    return sessionStorage.length;
  }

  clear(): void {
    sessionStorage.clear();
  }

  getItem(key: string): string | null {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    const decrypted = CryptoJS.AES.decrypt(value, envConfig.cryptoPassphrase);
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

  getItemJson<T>(key: string): T | null {
    const plaintext = this.getItem(key);
    if (!plaintext) return {} as any;
    try {
      const value: T = JSON.parse(plaintext);
      return value;
    } catch (error) {
      logger.error(error);
      return {} as any;
    }
  }

  key(index: number): string | null {
    return sessionStorage.key(index);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    if (value === null || value === undefined) value = "";
    const cipherText = CryptoJS.AES.encrypt(value, envConfig.cryptoPassphrase);
    sessionStorage.setItem(key, cipherText.toString());
  }

  setItemJson<T>(key: string, value: T): void {
    if (value === null || value === undefined) {
      value = {} as any;
    }
    const rawData = JSON.stringify(value);
    this.setItem(key, rawData);
  }
}

export const securitySessionStorage: SecuritySessionStorage = new SecuritySessionStorage();
