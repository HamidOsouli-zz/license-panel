import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import authClient from '../lib/Auth'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, path }) => {
  useEffect(() => {
    if (authClient.isAuthenticated()) {
      authClient.signIn()
    }
  }, [])

  const render = props => <Component {...props} />

  return <Route path={path} render={render} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
}

export default PrivateRoute

