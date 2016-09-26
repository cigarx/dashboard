import React, { Component, PropTypes } from 'react';
import { Table, Tooltip, Icon } from 'antd';
import { Link } from 'react-router';

import styles from './Rank.less';


const Rank = ({ TopTenData }) => {
  const rankItem = (o, row, index) => {
    if (row.rank <= 3) {
      return <span><Icon type="star" className={styles[`rankIcon-${row.rank}`]} /></span>
    }
    return <span>{row.rank}</span>
  }

  const renderText = (o, row, index) => {
    let companyName = '';
    if (row.name.length > 24) {
      companyName = (
        <Tooltip placement="bottom" title={row.name}>
          <span>{`${row.name.substr(0, 23)}...`}</span>
        </Tooltip>
        )
    } else {
      companyName = (<span>{row.name}</span>)
    }
    let href = `/company/${row.id}`;
    return <Link to={href} > {companyName} </Link>
  }


  const columns = [{
    title: '排名',
    dataIndex: 'rank',
    width: 45,
    render: rankItem,
    className: styles.text_center,
  }, {
    title: '企业名称',
    className: 'company-name',
    dataIndex: 'name',
    render: renderText,
  }, {
    title: TopTenData.seriesName,
    dataIndex: 'value',
    className: styles.text_right,
    width: 80,
  }];

  const data = TopTenData.data;

  return (
    <div className={styles.rankitem}>
      <Table
        loading={TopTenData.loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
      />
    </div>
  )
}

Rank.propTypes = {};

export default Rank;
