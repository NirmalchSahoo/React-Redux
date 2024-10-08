// import redux from 'redux'
const redux = require('redux');
const createStore = redux.createStore;
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

const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

// declare the reducer function which takes state and action

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, // create a compy of the object using the spread operator and change the state in that
        numOfCakes: state.numOfCakes - 1,
      };
    case BUY_ICECREAM:
      return {
        ...state, // create a compy of the object using the spread operator and change the state in that
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log('Initial State', store.getState());
const unsuscribe = store.subscribe(() =>
  console.log('Updated State', store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsuscribe();
