import CryptoJS from "crypto-js";
import { SessionData, UserData } from "mixejs";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "SESSION_SECRET";

export class SessionCookie {
  static async encode(payload: {
    user: UserData & { language?: string | null };
    session: SessionData;
  }) {
    const payloadString = JSON.stringify(payload);
    const hash = CryptoJS.AES.encrypt(payloadString, SESSION_SECRET).toString();
    return hash;
  }

  static async decode(value: string) {
    const unhash = CryptoJS.AES.decrypt(value, SESSION_SECRET).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(unhash) as {
      user: UserData;
      session: SessionData;
    };
  }
}
