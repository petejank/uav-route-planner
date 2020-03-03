import * as authApi from 'api/session'
import {UserType, UserAuthPayloadType} from 'types/user'
import {SetActionType, RemoveActionType} from './types'
import {ThunkResultType} from 'store/types'

export const USER_FETCH = 'USER:FETCH'
export const USER_SET = 'USER:SET'
export const USER_REMOVE = 'USER:REMOVE'

export function fetch(): ThunkResultType<Promise<UserType>> {
  return (dispatch) =>
    authApi.fetchSession().then((user) => {
      dispatch(set(user))
      return user
    })
}

export function logout(): ThunkResultType<Promise<void>> {
  return (dispatch) =>
    authApi.logout().then(() => {
      dispatch(remove())
    })
}

export function login(payload: UserAuthPayloadType): ThunkResultType<Promise<void>> {
  return (dispatch) =>
    authApi.login(payload).then((user) => {
      dispatch(set(user))
    })
}

export function set(user: UserType): SetActionType {
  return {
    type: USER_SET,
    user
  }
}

export function remove(): RemoveActionType {
  return {
    type: USER_REMOVE
  }
}
