// import redux from 'redux'
const redux = require('redux');
const createStore = redux.createStore;
// declare combine reducer
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
// redux logger
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
// create the action type
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First Redux action',
  };
}
function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: 'Second Redux action',
  };
}

// (previousState,action) => newState declare the initial state

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };
const initialIceCreamState = {
  numOfIceCreams: 20,
};
const initialCakeState = {
  numOfCakes: 10,
};

// declare the reducer function which takes state and action

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, // create a compy of the object using the spread operator and change the state in that
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state, // create a compy of the object using the spread operator and change the state in that
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};
// combine reducer call
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
// const store = createStore(reducer);
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial State', store.getState());
const unsuscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsuscribe();
