import { NextPageContext } from "next";
import React, { Component } from "react";
import { AuthToken } from "../services/authToken";
import { redirectToLogin , redirectBack} from "../services/redirectService";


export function NotPrivateRoute(WrappedComponent) {
  return class extends Component {

    static async getInitialProps(ctx) {
      // create AuthToken
    
      const initialProps = { };
      // if the token is expired, that means the user is no longer (or never was) authenticated
      // and if we allow the request to continue, they will reach a page they should not be at.
       
       if(await AuthToken.isAuth(ctx)){
         return redirectBack(ctx)
       }
    
      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps(initialProps);
        // make sure our `auth: AuthToken` is always returned
        return { ...wrappedProps };
      }
      return initialProps;
    }

    render() {
      // we want to hydrate the WrappedComponent with a full instance method of
      // AuthToken, the existing props.auth is a flattened auth, we want to use
      // the state instance of auth that has been rehydrated in browser after mount
      const { ...propsWithoutAuth } = this.props;
      return <WrappedComponent  {...propsWithoutAuth} />;
    }
  };
}