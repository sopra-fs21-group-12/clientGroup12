import React from "react";
import { Redirect } from "react-router-dom";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user isn't authenticated (i.e., a token is not stored in the local storage)
 * {props.children} are rendered --> The content inside the <RegistrationGuard> in the App.js file, i.e. the user is not able to acess the main page"
 * If the user is authenticated, the components redirects to the /game screen
 * @Guard
 * @param props
 */
export const RegistrationGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already Registered, he is redirected to the main /app
  return <Redirect to={"/game"} />;
};
