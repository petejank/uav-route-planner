import React from 'react'

import * as userActions from 'store/state/user/actions'
import SignInContent from './Content'
import {useDispatch} from 'store'

const SignInContainer = () => {
  const dispatch = useDispatch()

  function authenticate(username: string, password: string) {
    dispatch(userActions.login({username, password}))
  }

  return <SignInContent authenticate={authenticate} />
}

export default SignInContainer
