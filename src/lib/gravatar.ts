import CryptoJS from "crypto-js";

export class Gravatar {
  static url(email: string) {
    const hashedEmail = CryptoJS.SHA256(email);
    return `https://www.gravatar.com/avatar/${hashedEmail}?s=200&d=monsterid`;
  }
}
