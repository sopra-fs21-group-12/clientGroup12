import {Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import React, { useState } from "react";

/**
 * This is a navigation bar, that appears on all sites
 */

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
    token: localStorage.getItem('token')
      }
    }
    
// Set state is there to make sure if we have a token, or not!
changeState = () => {
        this.setState({
            token: localStorage.getItem("token")
        })
    }

    render(){
      return(
          <div>
            <nav className="nav-wrapper blue darken-3">
            <div className="container">
                <Link to="/" className="brand-logo"><i class="large material-icons">code</i>Dennis Project</Link>
                {/* This displays the right Links we either have a token or dont have one-> If we log out we do not have a token anymore */}
                {this.state.token == null ? <SignedOutLinks /> : <SignedInLinks/>}
            </div>
        </nav>
          </div>
      )
    }
  }
  export default Navigation;
  