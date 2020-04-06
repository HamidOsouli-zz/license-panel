import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authClient from '../lib/Auth'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, path }) => {
  if (!authClient.isAuthenticated()) {
    return <Redirect to="/" />
  }

  const render = props => <Component {...props} />
  return <Route exact path={path} render={render} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
}

export default PrivateRoute

