import { Modal } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import Router  from "next/router";
import { loginSuccess } from "../redux/actions/auth";
import { initStore } from "../redux/store";
import { AuthToken } from "./authToken";



export const postLogin = async ( path,userData)=> {
  return await post(path, userData)
 .then(({data})=>{
   AuthToken.storeToken(data.token)
   let authToken = new AuthToken(data.token)
   if(authToken.decodedToken.userType==="staff"){
     initStore().dispatch(loginSuccess(authToken.decodedToken, authToken.decodedToken.userType))
   }
   if(authToken.decodedToken.userType==="student"){
    initStore().dispatch(loginSuccess(authToken.decodedToken, authToken.decodedToken.userType))
  }
  Router.push('/dashboard')
  return   Modal.success({
    title:"Login Successfully",
  })
 })
 .catch(err=>{
   if(err.response){
     return   Modal.error({
       title:err.response.data.title,
       content:err.response.data.message
     })
   }
   else{
    return   Modal.error({
      title:err.message,
    })
   }
 })
};

// a base configuration we can extend from
const baseConfig = {
  baseURL: "http://localhost:4000",
};

const post = (url, data) => {
  return axios.post(url, data, baseConfig)
};