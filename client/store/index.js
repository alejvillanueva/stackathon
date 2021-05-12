import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import topArtists from './artists';

// Loading check
const LOADED = 'LOADED';

const loaded = (state = true, action) => {
  if (action.type === LOADED) {
    state = { ...state, loading: false };
    return state;
  }
};
const initialState = {
  topArtists: [],
  relatedArtists: [],
  songs: [],
};

const reducer = combineReducers({
  topArtists,
});

export default createStore(reducer, applyMiddleware(thunk, logger));
