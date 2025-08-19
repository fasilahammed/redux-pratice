// index.js
import store from "./store.js";
import { increment, decrement } from "./actions.js";

// Subscribe to store updates
store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// Dispatch actions
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
