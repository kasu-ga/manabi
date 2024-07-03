import { SessionData, UserData } from "mixe";

export class SessionCookie {
  static async encode(payload: {
    user: UserData & { language?: string | null };
    session: SessionData;
  }) {
    return JSON.stringify(payload);
  }

  static async decode(value: string) {
    return JSON.parse(value) as {
      user: UserData;
      session: SessionData;
    };
  }
}
