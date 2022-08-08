import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productReducer from "./product";
import sessionReducer from "./session";
import orderReducer from "./order"
import cartReducer from "./cart";
import mapsReducer from "./map";
import reviewReducer from "./review";
//reducer

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  products: productReducer,
  orders: orderReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  map: mapsReducer
});


let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};



export default configureStore;
