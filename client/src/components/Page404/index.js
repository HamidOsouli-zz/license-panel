import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Result, Button } from 'antd'

class Page404 extends Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={[
                    <Link to="/" key="home">
                        <Button type="primary">HOME</Button>
                    </Link>
                ]}
            />
        )
    }
}

export default Page404