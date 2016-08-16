import React, {Component, PropTypes} from 'react';
import {Table,Button} from 'antd';
import styles from './Details.less';

const DetailTable = ({data,byPage,onPageChange,onShowChart}) => {

  const renderAction = (o, row, index) => {

    return  (<Button type="primary" size="small" onClick={onShowChart.bind(this,o)}>显示图表</Button>);
  };

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      width: 200,
      key:'name'
    }, {
      title: '行业',
      dataIndex: 'industry',
      key:'industry',
      width: 150
    }, {
      title: '区域',
      dataIndex: 'region',
      key:'region',
    },{
      title:'操作',
      key: 'operation',
      fixed: 'right',
      width: 80,
      render: renderAction
    }
  ];

  const pagination = {
    total: byPage.total,
    defaultCurrent : byPage.current,
    pageSize : byPage.pageSize,
    onChange : onPageChange
  };

  return (
    <div className={styles.table}>
    <Table columns={columns} dataSource={data} pagination={pagination} scroll={{
    y: 300
  }}/>
</div>);
};


DetailTable.propTypes = {
  data: PropTypes.array.isRequired,
  byPage: PropTypes.object.isRequired,
  onPageChange:PropTypes.func.isRequired,
  onShowChart : PropTypes.func.isRequired,
};

export default DetailTable;
