import { Modal } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { initStore } from "../redux/store";
import { url } from "../redux/varables";
import { AuthToken } from "./authToken";

export const postLogin = async (path, userData, loginSuccess) => {
   return await post(path, userData)
      .then(async ({ data }) => {
         AuthToken.storeToken(data.token);
         let authToken = new AuthToken(data.token);
         await loginSuccess(
            authToken.decodedToken,
            authToken.decodedToken.userType
         );

         if (authToken.decodedToken.userType === "admin") {
            await Router.push("/dashboard");
         }

         if (authToken.decodedToken.userType === "staff") {
            await Router.push("/dashboard/staff");
         }

         if (authToken.decodedToken.userType === "student") {
            await Router.push("/dashboard/student");
         }

         return Modal.success({
            title: "Login Successfully",
         });
      })
      .catch((err) => {
         if (err.response) {
            return Modal.error({
               title: err.response.data.title,
               content: err.response.data.message,
            });
         } else {
            return Modal.error({
               title: err.message,
            });
         }
      });
};

// a base configuration we can extend from
const baseConfig = {
   baseURL: url,
};

const post = (url, data) => {
   return axios.post(url, data, baseConfig);
};
