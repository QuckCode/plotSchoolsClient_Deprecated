import jwt from 'jsonwebtoken'


export class AuthToken {

  constructor(token) {
    // we are going to default to an expired decodedToken
    this.decodedToken = {
      user:{},
     isAuth:false,
     userType:""
    }

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