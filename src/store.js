import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middle_ware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middle_ware))
);

export default store;
