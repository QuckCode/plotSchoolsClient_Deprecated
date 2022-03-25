import { ServerResponse } from "http";
import Router from "next/router";
import { AuthToken } from "./authToken";

export const redirectToLogin = (server, lock) => {
   // add the redirected query param for debugging
   const login = "/signin?redirected=true";
   if (server) {
      // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
      // server rendered pages need to do a server redirect
      server.writeHead(302, {
         Location: login,
      });
      server.end();
   } else {
      Router.push(login);
   }
   return null;
};

export const redirectBack = (server) => {
   const dashboard = "/dashboard";
   if (server) {
      server.res.writeHead(302, {
         Location: dashboard,
      });
      server.res.end();
   } else {
      Router.push(dashboard);
   }
};

export const redirectError = (server) => {
   const dashboard = "/502";
   if (server) {
      server.res.writeHead(302, {
         Location: dashboard,
      });
      server.res.end();
   } else {
      Router.push(dashboard);
   }
};
