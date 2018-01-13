import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'

import App from './app'
import { ResetPasswordReducer, SignupReducer, SigninReducer } from './authentication/reducers'
import { UserReducer } from './profile/reducers'

import './styles/icomoon/style.css'
import './styles/css/index.css'

const initialeState = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {}

const middleware = [thunk]
const enhancers = []

const store = createStore(
  combineReducers({
    user: UserReducer,
    resetPassword: ResetPasswordReducer,
    signup: SignupReducer,
    signin: SigninReducer
  }),
  initialeState,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('main')
)
