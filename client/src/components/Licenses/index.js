import React from 'react'
import moment from 'moment'

import { PageHeader, Table, Tag, Divider, Popconfirm, message, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

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

function confirm() {
  message.success('Click on Yes');
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'License Id',
    dataIndex: 'license_id',
    key: 'license_id',
    align: 'center',
  },
  {
    title: 'expire Date',
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
    title: 'Operating System',
    dataIndex: 'operating_system',
    key: 'operating_system',
    align: 'center',
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
    width: 200,
    fixed: 'right',
    align: 'center',
    render: (text, record) => {
      if (record.license_status === 'pending') {
        return (
            <>
              <Popconfirm
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  title="Are you sure?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
              >
                <Button type="link" size="small">CONFIRM</Button>
              </Popconfirm>

              <Popconfirm
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  title="Are you sure?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
              >
                <Button type="link" danger size="small">REJECT</Button>
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
    id: '1',
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: '2',
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: '3',
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: '4',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: '5',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
  {
    id: '1',
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: '2',
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: '3',
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: '4',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: '5',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
  {
    id: '1',
    license_id: 'CFZZ',
    expire_date: 202012312359,
    operating_system: 'Android',
    user: 'FARZAD',
    license_status: 'pending',
  },
  {
    id: '2',
    license_id: 'XASD',
    expire_date: 202012312359,
    operating_system: 'ios',
    user: 'PAYAM',
    license_status: 'done',
  },
  {
    id: '3',
    license_id: 'RPGR',
    expire_date: 202112312359,
    operating_system: 'windows',
    user: 'HAMID',
    license_status: 'rejected',
  },
  {
    id: '4',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'HAMID',
    license_status: 'done',
  },
  {
    id: '5',
    license_id: 'POFW',
    expire_date: 202030062359,
    operating_system: 'osx',
    user: 'FARZAD',
    license_status: 'rejected',
  },
];

class Licenses extends React.Component {
  render() {
    return (
        <>
          <PageHeader
              className="site-page-header"
              title="LICENSES"
              subTitle="List of the LICENSES"
          />
          <Divider dashed />
          <Table
              columns={columns}
              dataSource={data}
              rowKey={record => record.id}
              pagination={{ hideOnSinglePage: true }}
          />
        </>
    );
  }
}

export default Licenses
