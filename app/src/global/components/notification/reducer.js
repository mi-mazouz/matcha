import { ADD_NOTIFICATION, NOTIFICATION_REMOVED } from './constants'

export default (state = null, { type, payload }) => {
  switch (type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        ...payload
      }
    case NOTIFICATION_REMOVED:
      return null
    default:
      return state
  }
}
