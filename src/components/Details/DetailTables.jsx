import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd';
import styles from './Details.less';

const DetailTable = ({loading, data, byPage, onShowChart,onExpandedRowsChange,onExpand , onTableChange}) => {
  const renderAction = (o, row, index) => {
    return (
      <Button type="primary" size="small" onClick={onShowChart.bind(this, o)}>显示图表</Button>
    );
  };

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry'
    }, {
      title: '订单数据',
      dataIndex: 'buy_number',
      key: 'buy_number',
      sorter:true
    }, {
      title: '统计时间',
      dataIndex: 'byDate',
      key: 'byDate'
    }, {
      title: '实际安装量',
      dataIndex: 'install_total',
      key: 'install_total ',
      sorter:true
    }, {
      title: '日活均值',
      dataIndex: 'activity_avg',
      key: 'activity_avg'
    }, {
      title: '月活总量',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
      sorter:true
    }, {
      title: '安装率',
      dataIndex: 'install_rate',
      key: 'install_rate',
      sorter:true
    }, {
      title: '使用率',
      dataIndex: 'user_rate',
      key: 'user_rate',
      sorter:true
    }, {
      title: '操作',
      key: 'operation',
      render: renderAction
    }
  ];

  const showTotal = () => {
    return `共 ${byPage.total} 条`;
  }

  const pagination = () => {
    if (Number(byPage.pageSize) > Number(byPage.total)) {
      return false
    }
    return {
      total: Number(byPage.total),
      defaultCurrent: 1,
      current: Number(byPage.current),
      pageSize: Number(byPage.pageSize),
      showTotal: showTotal
    };
  }

  return (
    <div>
      <Table loading={loading} onExpandedRowsChange={onExpandedRowsChange}
      onChange={onTableChange}
      columns={columns}  onExpand={onExpand} dataSource={data} pagination={pagination()}/>
    </div>
  );
};


DetailTable.propTypes = {
  data: PropTypes.array.isRequired,
  byPage: PropTypes.object.isRequired,
  onShowChart : PropTypes.func.isRequired,
  onExpandedRowsChange:PropTypes.func.isRequired,
  onExpand : PropTypes.func.isRequired,
  loading:PropTypes.bool,
  onTableChange: PropTypes.func.isRequired,
};

export default DetailTable;
