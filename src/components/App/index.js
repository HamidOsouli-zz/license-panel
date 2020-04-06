import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  withRouter
} from 'react-router-dom'

import { Layout } from 'antd';

import PrivateRoute from '../../containers/PrivateRoute'
import Home from '../Home'
import Sidebar from '../Sidebar'
import Licenses from '../Licenses'
import NewLicense from '../NewLicense'
import Page404 from '../Page404'

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout className="App" style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout className="site-layout">
            <Content className="App-content">
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/licenses" component={Licenses} />
                <PrivateRoute path="/new-license" component={NewLicense} />
                <PrivateRoute path="*" component={Page404} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(App)