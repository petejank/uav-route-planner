import * as actions from './actions'
import {DEFAULT_USER_STATE} from 'store/constants/user'
import {UserStateType, RemoveActionType, SetActionType} from './types'

export default (state: UserStateType = DEFAULT_USER_STATE, action: RemoveActionType | SetActionType) => {
  switch (action.type) {
    case actions.USER_SET:
      return {
        ...state,
        ...action.user
      }
    case actions.USER_REMOVE:
      return {
        ...DEFAULT_USER_STATE
      }
    default:
      return state
  }
}
