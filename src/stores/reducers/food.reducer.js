const initialState = {
  food: [],
  isLoading: false,
  success: false,
}

export const foodReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'FETCH_FOOD_REQUEST':
      return {
        ...state,
        isLoading: true,
        success: false,
      }

    case 'FETCH_FOOD_SUCCESS':
      return {
        ...state,
        food: payload,
        isLoading: false,
        success: true,
      }
    case 'FETCH_FOOD_FAILED':
      return {
        ...state,
        isLoading: false,
        success: false,
      }

    default:
      return state
  }
}

export default foodReducer
