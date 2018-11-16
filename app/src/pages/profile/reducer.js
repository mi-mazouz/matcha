import { FETCH_USER_SUCCESS } from './constants'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return payload
    default:
      return state
  }
}
