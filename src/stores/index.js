import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas";
import { reducer as FeedReducer } from "./Feed";

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    feed: FeedReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
