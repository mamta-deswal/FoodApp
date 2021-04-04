import { combineReducers } from 'redux'
import foodReducer from './food.reducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  foodReducer,
})

export default reducers
