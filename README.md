# Finder. (Client)

## Introduction

### What's the aim of the application?

Swap your belongings for something better!

The goal of this project was to create a trading plattform, however with a twist. Instead of having a boring and dull looking interface, the user is animated to swipe on other items, that he is interested in. In our application the user is able to upload multiple pictures, add a description, a title and is even able to set the location for his items, that he wants to trade with. Based on tags, that he chooses the user can then filter his suggestions for trading. The swiping is ingenious, letting him do this in a Tinder like fashion. If a match is created (two people liked eachothers items/want to trade them), the two users are then able to chat with eachother and negotiate the further trade.


## How to use this application?
To use the application you don't need to install anything. You can access it through your browser [here](http://sopra-fs21-group-12-client.herokuapp.com/) (We strongly suggest Google Chrome). If you want to run the application locally, we suggest to download this Repo and the Server Repo [(here)](https://github.com/sopra-fs21-group-12/serverGroup12), to get it up and running.

## Technologies
### Programming language and enviroment

#### React JS (Visual Studio Code)
For this project we used React (Javascript, HTML and CSS) to get it up and running. You can find further documentation about ReactJS right here:
https://reactjs.org/docs/getting-started.html
#### Material UI for React
To style our application we choose Material UI, a simple framework for a clean and good looking UI. The documentation can be found right here:
https://material-ui.com/getting-started/installation/

#### RSuite
We also used the RSuite library for our styling, which documentation can be found right here:
https://rsuitejs.com/guide/introduction/

#### Google Maps API
To see where the items are located, we decided also to implement Google Maps. If you like to implement it into your project, the documentation can be found right here:
https://developers.google.com/maps/documentation/javascript/overview?hl=en

## High-Level components

### AppRouter.js 
The [AppRouter.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/master/src/components/shared/routers/AppRouter.js) is the main component for the routing of the application. It includes all the major components of the application. 

### MyInventory.js 
[MyInventory.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/a50c9374b48f91016b69ebebea2cd1a1b737d8b5/src/components/Inventory/MyInventory.js) component represents the main inventory of the user. Here he can add more items to his inventory, that he would like to trade with. This component represents in a way the Homepage of our application. The user has the option to choose an Item to go swipe with, edit the item or see the matches of the item.

### SwipeRouter.js with Swipepage.js
The [SwipeRouter.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/master/src/components/shared/routers/SwipeRouter.js) includes the subrouting for the Swipepage.js component. This subrouting is done per Item.  The [Swipepage.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/a50c9374b48f91016b69ebebea2cd1a1b737d8b5/src/components/game/SwipePage.js#L45) component is one of the most important components, as it is the Swipe-Page for the application. Here the user can swipe with his item on other suggested items, that he would like to trade with. The Swipepage thus represents a major component of the app.


### chatRouter.js and chat.js
As a part of our application, the user is able after creating a match with another item (Both users liked eachothers items), to chat and negotiate the further trade. The [chatRouter.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/a50c9374b48f91016b69ebebea2cd1a1b737d8b5/src/components/shared/routers/chatRouter.js) is again a specific subrouting per Item and the [chat.js](https://github.com/sopra-fs21-group-12/clientGroup12/blob/a50c9374b48f91016b69ebebea2cd1a1b737d8b5/src/components/chatlist/chat.js) component represents the actual chat. 

The correlation of these components is mainly based on the item. The user is redirected after registering or logging-in to the MyInventory.js component by the AppRouter. He then first creates an Item and then goes to the Swipepage.js with his Item. This subrouting is then done by the SwipeRouter.js. If a Match is created the user can then chat with the other item.


## Launch & Deployment

### How to get things up and running 
To get things up and running as a developer in the fronted, there are a couple of steps that need to be done. Firstly a good IDE is recommended. We as a Team mainly used Visual Studio Code, but another IDE, such as WebStorm by Jetbrains works to.

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Roadmap
As a new developer here are some suggestions, that could be added to our project:
* We would like to implement a proper Userpage, that can be seen by other users and interacted with.
* We would like to implement statistics on users and their items. These data would be used to develop a more sophisticated item Proposal, so that the match percentage of a user with a given item ca be increased
* implement a User rating, where you can rate the other user in terms of the swap process. This would increase trustworthyness of users.
* A swap History with all items you haved swapped so far should be displayed for every item.
* Further Google Maps implementations for a match, so that the route and route time is calculated to make the swap.   




# some Notes
Link to mockups: https://balsamiq.cloud/sxutwm7/pc0hokj/r9C75

Leaflet for maps JS API?: https://leafletjs.com/

User Stories Report: https://docs.google.com/document/d/1u1ehNyZr-bR-K5GJ65GThVHZn6MtxBHXY5daQ7ILqI0/edit
