import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import ProfileRouter from "./ProfileRouter"
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import {LoginGuard} from "../routeProtectors/LoginGuard";


import Register from "../../Registration/Register";
import Login from "../../login/Login";
import Navigation from "../../Navigation/Navigation";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";



/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start changes done
 * 
 */
class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    // This here creates a Reference to the Navigation bar -> ref={this.childTwo}
    this.childTwo = React.createRef();
    }

// As we now have a reference to the Navigation bar, we can call the changeState() method inside it.
// We mainly use this spesific method to refresh our Navigation bar.
changeNavState = () => {
    this.childTwo.current.changeState();
    }

  render() {
    return (
      <BrowserRouter>
      {/* Gives the reference of the navigarion*/}
        <Navigation ref={this.childTwo}/>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter callGameParent={this.changeNavState} base={"/game"} />
                </GameGuard>
              )}
            />
            <Route 
            path="/login" 
            exact
            render={() => (
              <LoginGuard>
                <Login callParent={this.changeNavState}/>
              </LoginGuard>
            )}
          />
            <Route
              path="/registration"
              exact
              render={() => (
                <RegistrationGuard>
                  <Register callParent={this.changeNavState}/>
                </RegistrationGuard>
              )}
            />
             <Route
              path="/profilepage"
              render={() => (
                <ProfileGuard>
                  <ProfileRouter base={"/profilepage"} />
                </ProfileGuard>
              )}
            />
            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
