import createSagaMiddleware from 'redux-saga'
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'

const initialState = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}
const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const middlewares = [sagaMiddleware]
  const enhancers = []

  const store = createReduxStore(
    combineReducers({
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )
  
  return store
}

export {
  createStore
}