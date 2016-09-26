import React, { Component, PropTypes } from 'react';
import { Table, Button, Icon, Tooltip } from 'antd';
import { Link } from 'react-router';
import styles from './Details.less';

const DetailTable = ({
  loading,
  data,
  byPage,
  onShowChart,
  onExpandedRowsChange,
  onExpand,
  routing,
  onTableChange,
  onShowSizeChange,
}) => {
  const renderAction = (o, row, index) => {
    return (
      <Button type="primary" size="small" onClick={onShowChart.bind(this, o)}>显示日报活</Button>
    );
  };

  const renderImportant = (o, row, index) => {
      // console.log(o, row, index);
    if (row.important) {
      return (<Icon type="check-circle" style={{ color: '#60BE29' }} />)
    }
    return undefined;
  }

  const renderText = (o, row, index) => {
    let companyName = '';
    if (row.name.length > 15) {
      companyName = (
        <Tooltip placement="bottom" title={row.name}>
          <span>{`${row.name.substr(0, 14)}...`}</span>
        </Tooltip>
        )
    } else {
      companyName = (<span>{row.name}</span>)
    }
    let href = `${routing.location.pathname}/${row.id}`;
    return <Link to={href} > {companyName} </Link>
  }


  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: renderText,
    },
    {
      title: '数据来源',
      dataIndex: 'server_num',
      key: 'serverinfo',
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
    }, {
      title: '行业',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '重点用户',
      dataIndex: 'important',
      key: 'important',
      className: styles.text_center,
      width: 70,
      render: renderImportant,
    },
    {
      title: '统计时间',
      dataIndex: 'bydate',
      className: styles.text_center,
      key: 'bydate',
      width: 70,
    }, {
      title: '订单数据',
      dataIndex: 'buy_total',
      key: 'buy_total',
      className: styles.text_right,
      width: 80,
      sorter: true,
    },
    {
      title: '安装总量',
      dataIndex: 'install_total',
      key: 'install_total ',
      className: styles.text_right,
      width: 80,
      sorter: true,
    },
    {
      title: '本月安装量',
      dataIndex: 'install_sum',
      key: 'install_sum ',
      className: styles.text_right,
      width: 95,
      sorter: true,
    },
    {
      title: '日活均值',
      dataIndex: 'acitvity_avg',
      width: 70,
      className: styles.text_right,
      key: 'acitvity_avg',
    }, {
      title: '月活总量',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
      className: styles.text_right,
      width: 80,
      sorter: true,
    }, {
      title: '使用率',
      dataIndex: 'user_rate',
      key: 'user_rate',
      className: styles.text_right,
      width: 70,
      sorter: true,
    }, {
      title: '操作',
      key: 'operation',
      render: renderAction,
    },
  ];

  const showTotal = () => {
    return `共 ${byPage.total} 条`;
  }

  const pagination = () => {
    if (byPage.pageSize > byPage.total) {
      return false
    }
    return {
      total: byPage.total,
      defaultCurrent: 1,
      current: byPage.current,
      pageSize: byPage.pageSize,
      showTotal,
      showSizeChanger: true,
      onShowSizeChange,
    };
  }

  return (
    <div>
      <Table
        loading={loading} onExpandedRowsChange={onExpandedRowsChange}
        onChange={onTableChange}
        columns={columns} onExpand={onExpand} dataSource={data} pagination={pagination()}
      />
    </div>
  );
};


DetailTable.propTypes = {
  data: PropTypes.array.isRequired,
  byPage: PropTypes.object.isRequired,
  onShowChart: PropTypes.func.isRequired,
  onExpandedRowsChange: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onTableChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired,
};

export default DetailTable;
