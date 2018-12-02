import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from 'redux'

import signInReducer from './pages/authentication/sign-in/reducer'
import signUpReducer from './pages/authentication/sign-up/reducer'
import forgotPasswordReducer from './pages/authentication/forgot-password/reducer'
import currentUserReducer from './layouts/logged/reducer'
import notificationReducer from './global/components/notification/reducer'
import profileReducer from './pages/profile/reducer'

import authenticationSagas from './pages/authentication/saga'
import { getCurrentUser } from './layouts/logged/saga'
import { landingPageFormSubmit } from './pages/landing/saga'
import { fetchUser } from './pages/profile/saga'

import { LOGOUT } from './layouts/logged/constants'

const initialState =
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}
const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const middlewares = [sagaMiddleware]
  const enhancers = []

  const appReducer = combineReducers({
    currentUser: currentUserReducer,
    notification: notificationReducer,
    profile: profileReducer,
    form: formReducer.plugin({
      signIn: signInReducer,
      signUp: signUpReducer,
      forgotPassword: forgotPasswordReducer
    })
  })

  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined
    }

    return appReducer(state, action)
  }

  const store = createReduxStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  sagaMiddleware.run(authenticationSagas)
  sagaMiddleware.run(landingPageFormSubmit)
  sagaMiddleware.run(getCurrentUser)
  sagaMiddleware.run(fetchUser)

  return store
}

export default createStore()
