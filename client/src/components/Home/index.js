import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import authClient from '../../lib/Auth'

import { PageHeader, Divider, Result, Button, Modal, Form, Input, message, Spin } from 'antd'
import { HomeTwoTone, UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'

class Home extends Component {
  state = {
    visible: false,
    isLoading: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleLogIn = async (values) => {
    this.setState({ isLoading: true })
    const data = await authClient.signIn(values)

    setTimeout(() => {
      if (data) {
        this.props.history.push('/licenses');
        this.setState({
          visible: false,
          isLoading: false
        });
      } else {
        this.setState({ isLoading: false })
        message.error('Wrong USERNAME or PASSWORD')
      }
    }, 1000)
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

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
          title="WELCOME TO THE LICENSE PANEL"
          extra={authClient.isAuthenticated() ? (
            [
              <Link to="/licenses" key="licenses">
                <Button type="primary">LICENSES</Button>
              </Link>
            ]
          ) : (
              [
                <Button type="primary" key="login" onClick={this.showModal}><LoginOutlined />LOG IN</Button>
              ]
            )
          }
        />

        <Modal
          title="LOG IN"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          closable={!this.state.isLoading}
          maskClosable={false}
        >
          <Spin spinning={this.state.isLoading}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.handleLogIn}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" className="login-form-button"><LoginOutlined />LOG IN</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </>
    );
  }
}

export default Home