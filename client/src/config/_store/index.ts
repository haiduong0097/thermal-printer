import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise-middleware";

import rootReducer from "../_reducers";

const middlewares = [thunkMiddleware, promiseMiddleware];

// redux devtools
const enhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

// create redux store
const store = createStore(rootReducer, enhancers);

export default store;
