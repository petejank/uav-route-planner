import {isEqual} from 'lodash'

import {DEFAULT_USER_STATE} from 'store/constants/user'
import * as userStorage from 'utils/userStorage'
import {UserType} from 'types/user'
import {Store} from 'redux'

export default function(store: Store) {
  store.subscribe(() => {
    const {user} = store.getState()
    const localStorageUser = userStorage.get()

    if (user !== localStorageUser) {
      if (isEqual(user, DEFAULT_USER_STATE)) return userStorage.clear()

      userStorage.save(user as UserType)
    }
  })
}
