import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import { Layout } from 'antd';

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
                <Route path="/" exact component={Home} />
                <Route path="/licenses" component={Licenses} />
                <Route path="/new-license" component={NewLicense} />
                <Route path="*" component={Page404} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App