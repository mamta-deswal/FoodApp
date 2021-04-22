/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  feed: ["data"],
  feedSuccess: ["data"],
  feedFailure: ["error"],
});

export const FeedType = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  data: {},
  error: false,
  isLoading: false,
};

export const feed = state => {
  return {
    ...state,
    isLoading: true,
    error: false
  };
};

export const feedSuccess = (state, { data }) => {
  console.log("feedSuccess sucesssscalled", data);
  return {
    ...state,
    data: data,
    isLoading: false,
    error: false
  };
};

export const feedFailure = (state, { error }) => ({
  ...state,
  data: {},
  isLoading: false,
  error: error
});


/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [FeedType.FEED]: feed,
  [FeedType.FEED_SUCCESS]: feedSuccess,
  [FeedType.FEED_FAILURE]: feedFailure,
});
