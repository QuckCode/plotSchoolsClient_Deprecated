import { ServerResponse } from "http";
import Router from "next/router";

export const redirectToLogin = (server) => {
  // add the redirected query param for debugging
  const login = "/login?redirected=true";
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
};