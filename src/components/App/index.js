import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  Route
} from 'react-router-dom'
import authClient from '../../lib/Auth'

import { Layout } from 'antd';

import PrivateRoute from '../../containers/PrivateRoute'
import Home from '../Home'
import Sidebar from '../Sidebar'
import Licenses from '../Licenses'
import NewLicense from '../NewLicense'
import Page404 from '../Page404'

const { Content } = Layout;

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (authClient.isAuthenticated()) {
      console.log('user hast')
    } else {
      if(this.props.location.pathname !== nextProps.location.pathname) {
        console.log('user nist')
        this.props.history.push('/')
      }
    }
  }

  render() {
    return (
      <Layout className="App" style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Content className="App-content">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/licenses" component={Licenses} />
              <PrivateRoute path="/new-license" component={NewLicense} />
              <Route path="*" component={Page404} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App)