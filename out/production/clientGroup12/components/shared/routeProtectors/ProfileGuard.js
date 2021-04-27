import React from "react";
import { Redirect } from "react-router-dom";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is  stored in the local storage)
 * {props.children} are rendered --> The content inside the <ProfileGuard> in the App.js file, i.e. the user is able to acess the profile page"
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const ProfileGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  // Else he is redirected to the login
  return <Redirect to={"/login"} />;
};
