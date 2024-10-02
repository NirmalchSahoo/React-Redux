const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;

// Action and Reducer
const testAction = () => {
  return function (dispatch) {
    dispatch({ type: 'TEST_ACTION', payload: 'Thunk is working!' });
  };
};

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TEST_ACTION':
      return { message: action.payload };
    default:
      return state;
  }
};

// Create Store with thunkMiddleware
const store = createStore(testReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

// Dispatch Action
store.dispatch(testAction());
