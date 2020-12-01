import jwt from 'jsonwebtoken'
import Cookie from "js-cookie";
import Router from "next/router";
const TOKEN_STORAGE_KEY = "plot.authToken";


export class AuthToken {

  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
    await Router.push("/dashboard");
  }

  constructor(token) {
    // we are going to default to an expired decodedToken
    this.decodedToken = {}

    // then try and decode the jwt using jwt-decode
    try {
      if (token) this.decodedToken = jwt.decode(token);
    } catch (e) {
      throw new Error(e.message)
    }
  }

   authorizationString() {
    return `Bearer ${this.token}`;
  }

   expiresAt(){
    return new Date(this.decodedToken.exp * 1000);
  }

    isExpired() {
    return new Date() > this.expiresAt;
  }

    isValid(){
    return !this.isExpired;
  }
}