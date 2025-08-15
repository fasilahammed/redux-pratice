// ----- mini-redux.js (a tiny Redux-like store) -----
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function dispatch(action) {
    if (!action || typeof action.type === "undefined") {
      throw new Error("Action must be an object with a 'type' field");
    }
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return action;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  // init
  dispatch({ type: "@@INIT" });
  return { getState, dispatch, subscribe };
}

// ----- reducer.js -----
const initialState = { count: 0, history: [] };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/increment":
      return { 
        ...state, 
        count: state.count + 1, 
        history: [...state.history, "inc"] 
      };
    case "counter/decrement":
      return { 
        ...state, 
        count: state.count - 1, 
        history: [...state.history, "dec"] 
      };
    case "counter/addBy":
      return { 
        ...state, 
        count: state.count + (action.payload ?? 0),
        history: [...state.history, `+${action.payload ?? 0}`]
      };
    default:
      return state;
  }
}

// ----- index.js (wire it up) -----
const store = createStore(counterReducer);

const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch a few actions
store.dispatch({ type: "counter/increment" });
store.dispatch({ type: "counter/increment" });
store.dispatch({ type: "counter/decrement" });
store.dispatch({ type: "counter/addBy", payload: 5 });

// Stop listening (optional)
// unsubscribe();

// Final state
console.log("Final:", store.getState());
