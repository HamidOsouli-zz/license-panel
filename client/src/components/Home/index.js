import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import authClient from '../../lib/Auth'

import { PageHeader, Divider, Result, Button, Modal, Form, Input, message } from 'antd'
import { HomeTwoTone, UserOutlined, LockOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'

class Home extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleFinish = values => {
        if (authClient.signIn(values)) {
            this.props.history.push('/')
            this.setState({
                visible: false,
            });
        } else {
            message.error('Wrong USERNAME or PASSWORD')
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

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
                            </Link>,
                            <Link to="/licenses" key="new_license">
                                <Button type="primary">NEW LICENSE</Button>
                            </Link>,
                        ]
                    ) : (
                        [
                            <Button type="primary" key="login" onClick={this.showModal}> <LoginOutlined /> LOG IN</Button>
                        ]
                    )
                    }
                />

                <Modal
                    title="LOG IN"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.handleFinish}
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
                            <Button block type="primary" htmlType="submit" className="login-form-button"> <LoginOutlined /> LOG IN</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Home