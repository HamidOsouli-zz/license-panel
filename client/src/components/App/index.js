import React from 'react'
import {
  Switch,
  withRouter,
  Route
} from 'react-router-dom'
import authClient from '../../lib/Auth'

import { Layout, Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import PrivateRoute from '../../containers/PrivateRoute'
import Home from '../Home'
import Sidebar from '../Sidebar'
import Licenses from '../Licenses'
import NewLicense from '../NewLicense'
import Page404 from '../Page404'

const { Content } = Layout;

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      if (authClient.isAuthenticated()) {
      } else {
        this.props.history.push('/')
      }
    }
  }

  handlelogout = () => {
    if (authClient.signOut()) {
      this.props.history.push('/')
    }
  }

  logoutBtn() {
    if (authClient.isAuthenticated()) {
      console.log('inja')
      return (
          <div className="App-user-info">
            <span>{authClient.getUserName()}</span>
            <Tooltip title="LOGOUT" placement="topRight">
              <Button onClick={() => this.handlelogout()} type="link" size="small" title="SIGNOUT"> <LogoutOutlined /></Button>
            </Tooltip>
          </div>
      )
    }
  }

  render() {
    return (
        <Layout className="App" style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout className="site-layout">
            <Content className="App-content">
              {this.logoutBtn()}
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