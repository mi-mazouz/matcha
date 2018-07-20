import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'

import { landingPageFormSubmit } from './pages/landing/saga'
import { signUpPageFormSubmit } from './pages/authentication/sign-up/saga'

const initialState = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}
const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const middlewares = [sagaMiddleware]
  const enhancers = []

  const store = createReduxStore(
    combineReducers({
      form: formReducer
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  sagaMiddleware.run(landingPageFormSubmit)
  sagaMiddleware.run(signUpPageFormSubmit)
  
  return store
}

export {
  createStore
}