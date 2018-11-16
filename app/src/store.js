import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from 'redux'

import signInReducer from './pages/authentication/sign-in/reducer'
import signUpReducer from './pages/authentication/sign-up/reducer'
import forgotPasswordReducer from './pages/authentication/forgot-password/reducer'
import profileReducer from './pages/profile/reducer'
import notificationReducer from './global/components/notification/reducer'
import currentUserReducer from './global/reducers/curent-user'
import authenticationSagas from './pages/authentication/saga'
import { getCurrentUser } from './Layouts/logged/saga'
import { landingPageFormSubmit } from './pages/landing/saga'
import { fetchUser } from './pages/profile/saga'

const initialState =
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}
const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const middlewares = [sagaMiddleware]
  const enhancers = []

  const store = createReduxStore(
    combineReducers({
      currentUser: currentUserReducer,
      form: formReducer.plugin({
        signIn: signInReducer,
        signUp: signUpReducer,
        forgotPassword: forgotPasswordReducer
      }),
      notification: notificationReducer,
      profile: profileReducer
    }),
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
