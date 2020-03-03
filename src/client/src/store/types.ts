import {Action} from 'redux'
import {ThunkDispatch, ThunkAction} from 'redux-thunk'

import {UserStateType} from './state/user/types'

type StoreType = {
  user: UserStateType
}

export type ThunkResultType<R> = ThunkAction<R, StoreType, any, Action>
export type DispatchType = ThunkDispatch<StoreType, any, Action>
export type SelectorType = (store: StoreType) => any
