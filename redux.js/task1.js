import { createStore, combineReducers } from "redux";

// -------------------- Action Types --------------------
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_TO_CART = "ADD_TO_CART";

// -------------------- Action Creators --------------------
const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });
const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });

// -------------------- User Reducer --------------------
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

// -------------------- Cart Reducer --------------------
const initialCartState = [];

function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    default:
      return state;
  }
}

// -------------------- Combine Reducers --------------------
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// -------------------- Create Store --------------------
const store = createStore(rootReducer);

// -------------------- State Logs --------------------
console.log("Initial State:", store.getState());

store.dispatch(login());
console.log("After LOGIN:", store.getState());

store.dispatch(addToCart({ id: 1, name: "iPhone" }));
console.log("After ADD_TO_CART:", store.getState());

store.dispatch(addToCart({ id: 2, name: "Samsung Galaxy" }));
console.log("After ADD_TO_CART second item:", store.getState());

store.dispatch(logout());
console.log("After LOGOUT:", store.getState());
