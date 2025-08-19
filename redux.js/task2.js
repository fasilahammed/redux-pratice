import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers.js";

// Action Types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_TO_CART = "ADD_TO_CART";

// Action Creators
const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });
const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });

// Reducers

const initialUserState = { loggedIn: false };

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true };
    case LOGOUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

const initialCartState = [];

function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    default:
      return state;
  }
}

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Middleware: Logger
const logger = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next State:", store.getState());
  return result;
};

// Create Store with Middleware + DevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

// Test Dispatch
console.log("Initial State:", store.getState());

store.dispatch(login());
store.dispatch(addToCart({ id: 1, name: "iPhone 15" }));
store.dispatch(logout());
