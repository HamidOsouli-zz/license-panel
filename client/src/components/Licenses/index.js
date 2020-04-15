import React from 'react'
import moment from 'moment'
import API from '../../lib/API'
import authClient from '../../lib/Auth'

import { PageHeader, Table, Tag, Divider, message, Button, Modal, Form, Input, Select, Spin } from 'antd'
import { PlusOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

const { Option } = Select
const { confirm } = Modal
const dateFormat = 'ddd, DD/MM/YYYY'

function getStatusColor(status) {
  switch (status) {
    case 'PENDING':
      return 'default';
    case 'ACCEPTED':
      return 'success';
    case 'REJECTED':
      return 'error';
    default:
      return 'default';
  }
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

class Licenses extends React.Component {
  state = {
    visible: false,
    isLoading: false,
    isTableLoading: false,
    user: authClient.getUserInfo(),
    tableData: []
  }

  tableColumns = this.state.user.role === 'admin' ? (
    [
      {
        title: 'License Id',
        dataIndex: 'license_id',
        key: 'license_id',
        align: 'center',
        width: 100,
        fixed: 'left',
      },
      {
        title: 'Operating System',
        dataIndex: 'os',
        key: 'operating_system',
        align: 'center',
        render: text => (
          <span>
            {text.toUpperCase()}
          </span>
        ),
        sorter: (a, b) => compareByAlph(a.os, b.os),
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'create_date',
        align: 'center',
        render: create_date => (
          <span>
            {moment(create_date).format(dateFormat).toUpperCase()}
          </span>
        ),
      },
      {
        title: 'Expiration Date',
        dataIndex: 'expirationDate',
        key: 'expire_date',
        align: 'center',
        render: expire_date => (
          <span>
            {moment(expire_date).format(dateFormat).toUpperCase()}
          </span>
        ),
      },
      {
        title: 'User',
        dataIndex: 'userName',
        key: 'user',
        align: 'center',
        sorter: (a, b) => compareByAlph(a.userName, b.userName),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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
          return (
            <>
              <Button type="link" size="small" onClick={() => this.handleAccept(record._id)} disabled={record.status !== 'PENDING'}><CheckOutlined /></Button>
              <Button type="link" size="small" onClick={() => this.handleReject(record._id)} danger disabled={record.status !== 'PENDING'}><CloseOutlined /></Button>
            </>
          )
        },
      },
    ]
  ) : (
      [
        {
          title: 'License Id',
          dataIndex: 'license_id',
          key: 'license_id',
          align: 'center',
          width: 100,
          fixed: 'left',
        },
        {
          title: 'Operating System',
          dataIndex: 'os',
          key: 'operating_system',
          align: 'center',
          render: text => (
            <span>
              {text.toUpperCase()}
            </span>
          ),
        },
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
          key: 'create_date',
          align: 'center',
          render: create_date => (
            <span>
              {moment(create_date).format(dateFormat).toUpperCase()}
            </span>
          ),
        },
        {
          title: 'Expiration Date',
          dataIndex: 'expirationDate',
          key: 'expire_date',
          align: 'center',
          render: expire_date => (
            <span>
              {moment(expire_date).format(dateFormat).toUpperCase()}
            </span>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
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
      ]
    )

  async getTableData() {
    this.setState({
      isTableLoading: true
    })

    const config = {
      method: 'get',
      endpoint: '/license/all',
      token: authClient.getUserToken(),
    }

    try {
      const res = await API(config)
      setTimeout(() => {
        this.setState({
          tableData: res.data.data,
          isTableLoading: false,
          isLoading: false,
          visible: false
        })
      }, 1000)

    } catch (err) {
      this.setState({
        isTableLoading: false
      })
      if (err.response && err.response.data && err.response.data.message) {
        message.error(err.response.data.message)
      } else {
        message.error('There is a problem with getting the data. Please try later')
      }
    }
  }

  async updateLicense (licenseId, updatetype) {
    this.setState({
      isTableLoading: true
    })

    const config = {
      method: 'post',
      endpoint: '/license/update',
      token: authClient.getUserToken(),
      data: JSON.stringify({
        id: licenseId,
        action: updatetype
      })
    }

    try {
      await API(config)
      setTimeout(() => {
        this.getTableData()
        message.success('Your license was updated')
      }, 1000)
    } catch (err) {
      this.setState({
        isTableLoading: false
      })
      if (err.response && err.response.data && err.response.data.message) {
        message.error(err.response.data.message)
      } else {
        message.error('There is a problem with updating the license. Please try later')
      }
    }
  }

  addLicense = async (values) => {
    this.setState({
      isLoading: true
    })

    const config = {
      method: 'post',
      endpoint: '/license/create',
      token: authClient.getUserToken(),
      data: JSON.stringify({
        os: values.operating_system,
        license_id: values.license_id,
      })
    }

    try {
      await API(config)
      setTimeout(() => {
        this.getTableData()
        message.success('Your license was added')
      }, 1000)
    } catch (err) {
      this.setState({
        isLoading: false
      })
      if (err.response && err.response.data && err.response.data.message) {
        message.error(err.response.data.message)
      } else {
        message.error('There is a problem with adding the license. Please try later')
      }
    }
  }

  handleAccept(licenseId) {
    const that = this
    confirm({
      title: 'Do you want to ACCEPT this items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        that.updateLicense(licenseId, 'accept')
      },
    });
  }
  
  handleReject(licenseId) {
    const that = this
    confirm({
      title: 'Do you want to REJECT this items?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        that.updateLicense(licenseId, 'reject')
      },
    });
  }

  componentWillMount() {
    this.getTableData()
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
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
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          bordered
          rowKey={record => record._id}
          pagination={{ hideOnSinglePage: true }}
          scroll={{ x: 996 }}
          loading={this.state.isTableLoading}
        />

        <Modal
          title="ADD NEW LICENSE"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          closable={!this.state.isLoading}
          maskClosable={false}
          scroll={{ x: 996 }}
        >
          <Spin spinning={this.state.isLoading}>
            <Form
              name="add_license"
              className="add_license"
              onFinish={this.addLicense}
              key={new Date().getTime()}
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
