import {createStore, applyMiddleware, combineReducers} from 'redux'
import {useSelector as reduxUseSelector, useDispatch as reduxUseDispatch} from 'react-redux'
import thunk from 'redux-thunk'

import userReducer from './state/user/reducers'
import userSubscriber from './subscribers/user'
import {DispatchType, SelectorType} from './types'

const store = createStore(
  combineReducers({
    user: userReducer
  }),
  applyMiddleware(thunk)
)

userSubscriber(store)

export default store

export * from 'react-redux'

export function useSelector(selector: SelectorType) {
  return reduxUseSelector(selector)
}

export function useDispatch(): DispatchType {
  return reduxUseDispatch()
}
