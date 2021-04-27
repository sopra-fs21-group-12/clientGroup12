import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import ProfileRouter from "./ProfileRouter"
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import {LoginGuard} from "../routeProtectors/LoginGuard";


import LoginHooks from "../../login/LoginHooks";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import Registration from "../../Registration/Registration";
import MyInventory from "../../Inventory/MyInventory";



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
  render() {
    return (
      <BrowserRouter>
      {/* Gives the reference of the navigarion*/}
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
            path="/login"
            exact
            render={() => (
              <LoginGuard>
                <LoginHooks />
              </LoginGuard>
            )}
          />
            <Route
              path="/registration"
              exact
              render={() =>(
                <RegistrationGuard>
                  <Registration/>
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
            <Route
            path="/inventory"
            render={() => (
              <MyInventory/>
            )}>
            </Route>
            <Route
              path="/"
              exact
              render={() =>
                <Redirect to={"/game"} />
              }
            />
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
