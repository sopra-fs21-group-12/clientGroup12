import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ChatRouter from "./chatRouter"
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import {LoginGuard} from "../routeProtectors/LoginGuard";


import LoginHooks from "../../login/LoginHooks";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import TestPage from "../../../TestPage";
import Registration from "../../Registration/Registration";
import MyInventory from "../../Inventory/MyInventory";
import ItemUpload from "../../item/ItemUpload";
import MyItemsList from "../../chatlist/myItems";
import Profile from "../../profilepage/Profile";
import MatchRouter from "./MatchRouter";
import SwipePage from "../../game/SwipePage";
import SwipeRouter from "./SwipeRouter";


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
      {/* Gives the reference of the navigation*/}
        <Switch>

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
            render={() => (
              <RegistrationGuard>
                <Registration/>
              </RegistrationGuard>
            )}
          />
           <Route
            path="/profile"
            render={() => (
              <ProfileGuard>
                <Profile/>
              </ProfileGuard>
            )}
          />
          <Route
            path="/upload"
            render={() => (
              <ProfileGuard>
                <ItemUpload />
              </ProfileGuard>
            )}
          />
          <Route
            path="/matches"
            render={() => (
                <MatchRouter base={"/matches"} />
            )}
          />
          <Route
            path="/test"
            exact
            render={() => (
                <TestPage/>
            )}
          />
          <Route
            path="/inventory"
            render={() => (
                <MyInventory/>
            )}
          />
          <Route
            path="/itemsToChat"
            exact
            render={() => (
                <MyItemsList/>
            )}
          />
          <Route
            path="/chat"
            render={() => (
                <ChatRouter base={"/chat"} />
            )}
          />
          <Route
            path="/swipe"
            render={() => (
                <SwipeRouter base={"/swipe"}/>
          )}
          />
          <Route
            path="/" exact
            render={() => <Redirect to={"/game"} />}
          />

        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
