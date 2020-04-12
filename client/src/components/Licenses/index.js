import React from 'react'
import moment from 'moment'

import { PageHeader, Table, Tag, Divider, Popconfirm, message, Button, Modal, Form, Input, Select, Spin } from 'antd'
import { QuestionCircleOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'default';
    case 'done':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
}

function handleConfirm() {
  message.success('Click on Yes')
}

function compareByAlph(a, b) {
  if (a > b) {
    return -1
  }
  if (a < b) {
    return 1
  }
  return 0
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 70,
    fixed: 'left',
  },
  {
    title: 'License Id',
    dataIndex: 'license_id',
    key: 'license_id',
    align: 'center',
  },
  {
    title: 'Operating System',
    dataIndex: 'operating_system',
    key: 'operating_system',
    align: 'center',
  },
  {
    title: 'Expire Date',
    dataIndex: 'expire_date',
    key: 'expire_date',
    align: 'center',
    render: expire_date => (
      <span>
        {moment(expire_date).format('dddd, DD/MM/YYYY HH:mm:ss').toUpperCase()}
      </span>
    ),
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'license_status',
    key: 'license_status',
    align: 'center',
    sorter: (a, b) => compareByAlph(a.license_status, b.license_status),
    render: license_status => (
      <span>
        <Tag color={getStatusColor(license_status)} key={license_status}>
          {license_status.toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 100,
    render: (text, record) => {
      if (record.license_status === 'pending') {
        return (
          <>
            <Popconfirm
              icon={<QuestionCircleOutlined style={{ color: '#1890ff' }} />}
              title="Are you sure to CONFIRM?"
              onConfirm={handleConfirm}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="link" size="small"><CheckOutlined /></Button>
            </Popconfirm>

            <Popconfirm
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              title="Are you sure to REJECT?"
              onConfirm={handleConfirm}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="link" size="small" danger><CloseOutlined /></Button>
            </Popconfirm>
          </>
        )
      } else {
        return null
      }
    },
  },
];

const data = [
  {
    id: 1,
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: 2,
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: 3,
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: 4,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: 5,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
  {
    id: 6,
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: 7,
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: 8,
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: 9,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: 10,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
  {
    id: 11,
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: 12,
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: 13,
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: 14,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: 15,
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
];

class Licenses extends React.Component {
  state = { 
    visible: false,
    isLoding: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleFinish = values => {
    this.setState({isLoding: true})
    setTimeout(() => {
      console.log(values)
      message.success('Click on Yes')
      this.setState({isLoding: false})
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
          title="LICENSES"
          subTitle="List of the LICENSES"
          tags={<Button onClick={this.showModal} size="small" type="primary"><PlusOutlined />NEW</Button>}
        />

        <Divider dashed />

        <Table
          columns={columns}
          dataSource={data}
          bordered
          rowKey={record => record.id}
          pagination={{ hideOnSinglePage: true }}
          scroll={{ x: 996 }}
        />

        <Modal
          title="ADD NEW LICENSE"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          closable={!this.state.isLoding}
          maskClosable={false}
          scroll={{ x: 996 }}
        >
          <Spin tip="Loading..." spinning={this.state.isLoding}>
            <Form
              name="add_license"
              className="add_license"
              onFinish={this.handleFinish}
            >
              <Form.Item
                name="license_id"
                rules={[{ required: true, message: 'Please input License Id!' }]}
              >
                <Input placeholder="License Id" />
              </Form.Item>

              <Form.Item
                name="operating_system"
                rules={[{ required: true, message: 'Please select one Operating System' }]}
              >
                <Select
                  placeholder="Select an Operating System"
                >
                  <Option value="osx">OSX</Option>
                  <Option value="ios">iOS</Option>
                  <Option value="android">ANDROID</Option>
                  <Option value="windows">WINDOWS</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" className="login-form-button">SUBMIT</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </>
    );
  }
}

export default Licenses
