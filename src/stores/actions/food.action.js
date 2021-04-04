import { getFoodList } from '../../api/fakeApiUser'

export const fetchFoodRequest = () => {
  return {
    type: 'FETCH_FOOD_REQUEST'
  }
}

export const fetchFoodSuccess = foodList => {
  return {
    type: 'FETCH_FOOD_SUCCESS',
    payload: foodList
  }
}

export const fetchFoodFail = () => {
  return {
    type: 'FETCH_FOOD_FAILED'
  }
}

export const fetchFoodData = () => async dispatch => {
  try {
    dispatch(fetchFoodRequest())
    const  data  = await getFoodList()
    console.log("fetuser successs called======", data);
    dispatch(fetchFoodSuccess(data))
  } catch (error) {
    dispatch(fetchFoodFail())
  }
}
