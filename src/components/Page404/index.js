import React, { Component } from 'react'

import { Result } from 'antd'

class Page404 extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    )
  }
}

export default Page404
