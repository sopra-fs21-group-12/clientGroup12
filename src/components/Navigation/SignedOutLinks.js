import React from "react";
import {NavLink} from "react-router-dom";

/**
 * This class contains the links of the signed out User see in the Navigation bar 
 * When he does not have a token
 */

const SignedOutLinks = () => {
    return ( 
        <ul className="right">
            <li><NavLink to="/login">Sign-In</NavLink></li>
            <li><NavLink to="/registration">Sign-Up</NavLink></li>
        </ul>
    )}
 
export default SignedOutLinks;