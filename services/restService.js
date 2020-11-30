import axios, { AxiosRequestConfig } from "axios";
import { LoginInputs } from "../pages/login";
import { AuthToken } from "./auth_token";
import { catchAxiosError } from "./error";


export const postLogin = async ( LoginInputs)=> {
  const data = new URLSearchParams(inputs);
  const res = await post("/api/login", data).catch(catchAxiosError);
  if (res.error) {
    return res.error;
  }
  if (res.data && res.data.token) {
    await AuthToken.storeToken(res.data.token);
    return;
  }
  return "Something unexpected happened!";
};

// a base configuration we can extend from
const baseConfig = {
  baseURL: "http://localhost:3000",
};

const post = (url, data) => {
  return axios.post(url, data, baseConfig).catch(catchAxiosError);
};