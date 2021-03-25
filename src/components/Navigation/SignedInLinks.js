import React from "react";
import {Link, NavLink} from "react-router-dom";

/**
 * This class contains the links of the signed in User see in the Navigation bar 
 */

const SignedInLinks = (props) => {
    // Is needed for the AVATAR ICON to click on and get redirected to the own profile page
    let id = localStorage.getItem("id");
    return ( 
        <ul className="right">
            <li><NavLink to="/" className="btn">Overview</NavLink></li>
            {/*A Little Avatar*/}
            <li><NavLink to={`/profilepage/${id}`} className="btn btn-floating pink lighthen-1"> <i class="material-icons">face</i></NavLink></li>
        </ul>
    )}
 
export default SignedInLinks;