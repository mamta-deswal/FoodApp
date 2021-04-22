import { takeLatest, all, take } from "redux-saga/effects";
import { StartupTypes } from "../Stores/Startup/Actions";
import { startup } from "./StartupSaga";

import  API  from '../Services/Api';
import { FeedType } from "../Stores/Feed";
import { feedList } from "./FeedSaga";
const api = API.create();

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(FeedType.FEED, feedList, api),
  ]);
}
