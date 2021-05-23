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
import PictureSliderSwiping from "../../pictures/PictureSliderSwiping";
import PictureInventory from "./../../pictures/PictureInventory";
import Navbar from "./../../Navbar/Navbar"
import EditItemRouter from "./EditItemRouter";
import Home from "../../HomeScreen/Home";

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
                    path="/home"
                    exact
                    render={() => (
                      <Home/>
                    )}
                  >
                  </Route>

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
                            <ProfileGuard>
                                <MatchRouter base={"/matches"} />
                            </ProfileGuard>
                        )}
                    />
                    <Route
                        path="/test"
                        exact
                        render={() => (
                            <Navbar/>
                        )}
                    />
                  <Route
                    path="/test2"
                    exact
                    render={() => (
                      <TestPage/>
                    )}
                  />
                    <Route
                        path="/inventory"
                        render={() => (
                            <ProfileGuard>
                                <MyInventory/>
                            </ProfileGuard>
                        )}
                    />
                      <Route
                        path="/edit"
                        render={() => (
                                <EditItemRouter base={"/edit"}/>
                        )}
                    />
                    <Route
                        path="/itemsToChat"
                        exact
                        render={() => (
                            <ProfileGuard>
                                <MyItemsList/>
                            </ProfileGuard>
                        )}
                    />
                    <Route
                        path="/chat"
                        render={() => (
                            <ProfileGuard>
                                <ChatRouter base={"/chat"} />
                            </ProfileGuard>
                        )}
                    />
                    <Route
                        path="/swipe"
                        render={() => (
                            <ProfileGuard>
                                <SwipeRouter base={"/swipe"}/>
                            </ProfileGuard>
                        )}
                    />
                    <Route
                      path="/"
                      exact
                      render={() =>
                        <Home/>
                      }
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
