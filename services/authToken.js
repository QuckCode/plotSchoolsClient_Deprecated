import jwt from 'jsonwebtoken'
import Cookie from "js-cookie";
import Router from "next/router";
import { redirectToLogin } from './redirectService';
const TOKEN_STORAGE_KEY = "plot.authToken";


export class AuthToken {

  static async fromNext(ctx) {
    if(ctx.req){
      if (ctx.req.headers.cookie) {
         return  new AuthToken(this.getStoredToken(ctx))
      } else {
         return  redirectToLogin(ctx.res, true)
      }
    }
  }

  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
  }

  static async removeToken() {
    Cookie.remove(TOKEN_STORAGE_KEY);
  }

  static async isAuth (ctx) {
    if(ctx.req){
      if (ctx.req.headers.cookie) {
         return  this.getStoredToken(ctx) ? true :false
      } else {
         return  false
      }
    }
  }

  static   getStoredToken(ctx){
    if(ctx.req){
      if (ctx.req.headers.cookie) {
            return ctx.req.headers.cookie.substring(TOKEN_STORAGE_KEY.length+1)
      } else {
            return null
      }
    }
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
    return new Date(this.decodedToken.exp);
  }

    isExpired() {
    return new Date() > this.expiresAt();
  }

  isValid(){
    return !this.isExpired();
  }
}