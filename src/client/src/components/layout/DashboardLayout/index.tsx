import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import DashboardLayoutNav from './Nav'
import MainContainer from 'components/pages/Main'
import * as userActions from 'store/state/user/actions'
import routes from 'routing/routes'

import useStyles from './styles'

const DashboardLayoutContainer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  function logout() {
    dispatch(userActions.logout())
  }

  return (
    <section className={classes.wrapper}>
      <DashboardLayoutNav logout={logout} />
      <Switch>
        <Route exact path={routes.signed.dashboard} component={MainContainer} />
        <Redirect to={routes.signed.dashboard} />
      </Switch>
    </section>
  )
}

export default DashboardLayoutContainer
