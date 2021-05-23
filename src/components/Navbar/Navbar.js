import {React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {NavbarLoggedOut} from "./NavbarLoggedOut"
import { withRouter } from 'react-router-dom';
import {NavbarLoggedIn} from "./NavbarLoggedIn";
import TestNav from "./TestNav"




export default function Navbar() {
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(localStorage.getItem("token"));
  });

  return (
   ((token==null) ? <NavbarLoggedOut/> : <NavbarLoggedIn/>)
  );
};