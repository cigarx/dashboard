import React, {Component, PropTypes} from 'react';
import {Table} from 'antd';

const DetailTable = ({data}) => {
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      width: 200
    }, {
      title: '行业',
      dataIndex: 'industry',
      width: 150
    }, {
      title: '区域',
      dataIndex: 'region'
    }
  ];

  const pagination = {
    total: data.length,
    defaultCurrent : 1,
    pageSize : 5,
    // onShowSizeChange(current, pageSize) {
    //   console.log('Current: ', current, '; PageSize: ', pageSize);
    // },
    // onChange(current) {
    //   console.log('Current: ', current);
    // }
  };

  return (<Table columns={columns} dataSource={data} pagination={pagination} scroll={{
    y: 300
  }}/>);
};


DetailTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DetailTable;
