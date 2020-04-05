import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { PageHeader, Divider, Result, Button } from 'antd'
import { HomeTwoTone } from '@ant-design/icons'

class Home extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="HOME"
        />
        <Divider dashed />

        <Result
          icon={<HomeTwoTone />}
          title="WELCOME TO THE LICENSES PANEL"
          extra={[
            <Link to="/licenses" key="licenses">
              <Button type="primary">LICENSES</Button>
            </Link>,
            <Link to="/licenses" key="new_license">
              <Button type="primary">NEW LICENSE</Button>
            </Link>,
          ]}
        />
      </>
    );
  }
}

export default Home
