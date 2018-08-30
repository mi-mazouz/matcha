import { FETCH_USER_SUCCESS } from './constants'

const initialState = {
  user: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
