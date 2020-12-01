import axios, { AxiosRequestConfig } from "axios";
import { AuthToken } from "./authToken";



export const postLogin = async ( path,userData)=> {
 await post(path, userData)
 .then(({data})=>{
   AuthToken.storeToken(data.token)
   let authToken = new AuthToken(data.token)
   console.log(authToken)
 })
 .catch(err=>{

 })
};

// a base configuration we can extend from
const baseConfig = {
  baseURL: "http://localhost:4000",
};

const post = (url, data) => {
  return axios.post(url, data, baseConfig)
};