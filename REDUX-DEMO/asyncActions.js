// Import Redux and applyMiddleware
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// Import redux-thunk
const thunkMiddleware = require('redux-thunk').default;

// Import axios
const axios = require('axios');

// Declare the initial state
const initialState = {
  loading: false,
  users: [],
  error: '',
};

// Declare action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Create action creators
const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};

const fetchUsersSuccess = (users) => {
  return { type: FETCH_USERS_SUCCESS, payload: users };
};

const fetchUsersFailure = (error) => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: action.payload, error: '' };
    case FETCH_USERS_FAILURE:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

// Async action creator using redux-thunk
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

// Create store with the reducer and apply thunk middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// Subscribe to store updates
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch the async action
store.dispatch(fetchUsers());
