import { put, call } from 'redux-saga/effects'
import FeedAction from '../Stores/Feed'
import { parse } from 'fast-xml-parser';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* feedList(api, action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  const response = yield call(api.feedList)
  const responseData = response.data;
  // var parser = new DOMParser();
  //  var xml = parser.parseFromString(responseData, "text/xml");
  let obj = parse(responseData);
  let feedData = obj && obj.rss && obj.rss.channel &&  obj.rss.channel.item;
  console.log("FeedAction saga after response---", feedData);
  if (response.status === 200) {
    yield put(FeedAction.feedSuccess(feedData))
  } else if (responseData) {
    yield put(FeedAction.feedFailure(responseData.message))
  } else {
    console.log("serever error");
  }
}