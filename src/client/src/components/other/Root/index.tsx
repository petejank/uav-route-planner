import React, {useEffect, useState} from 'react'
import {Router, Redirect, Switch} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles'

import * as userStorage from 'utils/userStorage'
import {CssBaseline} from 'components/shared/material'
import Route from 'components/other/Route'
import DashboardLayout from 'components/layout/DashboardLayout'
import UnsignedLayout from 'components/layout/UnsignedLayout'
import history from 'routing/routerHistory'
import * as userActions from 'store/state/user/actions'
import routes from 'routing/routes'
import {useDispatch} from 'store'
import theme from 'utils/theme'

import useStyles from './styles'

const signedPaths = Object.values(routes.signed)
const unsignedPaths = Object.values(routes.unsigned)

const Root = () => {
  useStyles()

  const [initialized, setInitialized] = useState(false)
  const dispatch = useDispatch()

  function initialize() {
    setInitialized(true)
  }

  useEffect(() => {
    const user = userStorage.get()
    if (!user) return initialize()

    dispatch(userActions.set(user))
    dispatch(userActions.fetch())
      .catch(() => {
        userStorage.clear()
        dispatch(userActions.remove())
      })
      .finally(initialize)
  }, [])

  if (!initialized) return null

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route requiresAuth path={signedPaths} component={DashboardLayout} />
          <Route inaccessibleWithToken path={unsignedPaths} component={UnsignedLayout} />
          <Redirect to={routes.signed.dashboard} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default Root
