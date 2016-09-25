import React , {Component,PropTypes} from 'react';
import { Table,Tooltip } from 'antd';
import {Link} from 'react-router';

import styles from './Rank.less';


const Rank = ({TopTenData}) => {

  const renderText = (o, row, index) =>{
      let company_name;
      if(row.name.length > 24){
        company_name = (
          <Tooltip placement="bottom" title={row.name}>
            <span>{row.name.substr(0,23)+ "..."}</span>
          </Tooltip>
        )
      }

      else {
        company_name =  (<span>{row.name}</span>)
      }
      let href = "/company/" + row.id;
      return <Link to={href} > {company_name} </Link>
  }


  const columns = [{
    title: '排名',
    dataIndex: 'rank',
    width:45,
    className: styles.text_right,
  }, {
    title: '企业名称',
    className: 'company-name',
    dataIndex: 'name',
    render:renderText
  }, {
    title: TopTenData.seriesName,
    dataIndex: 'value',
    className: styles.text_right,
    width:60
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
