import React, { Component, PropTypes } from 'react';
import { Row, Col, Radio, Icon, Tooltip, Select } from 'antd';
import CardItem from './CardItem';
import styles from './Card.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CardGroup = ({ SummarlData, byDate }) => {
  const { nowdata, predata, loading, oldNumber } = SummarlData
  const convertCompare = (date) => {
    const constDate = {
      weekly: '上周',
      daily: '昨日',
      monthly: '上月',
    }
    return constDate[date]
  }

  const compareStyle = (nowData, preData) => {
    if (nowData >= preData) {
      return 'caret-up'
    }
    return 'caret-down'
  }

  const compareNum = (nowData, preData) => {
    if (nowData >= preData) {
      return (`${Math.round((nowData - preData) / nowData * 10000) / 100.00}%`);
    }
    return `${Math.round((preData - nowData) / nowData * 10000) / 100.00}%`
  }

  let UIModelActivity = {
    titleIcon: 'hdd',
    title: '报活数（次）',
    number: oldNumber.activity_sum,
    compare: 'caret-up',
    compare_num: '正在读取',
    compare_title: '正在读取',
    oldnumber: 0,
  }

  let UIModelCompany = {
    titleIcon: 'team',
    title: '企业数（家）',
    number: oldNumber.company_num,
    compare: 'caret-up',
    compare_num: '正在读取',
    compare_title: '正在读取',
    oldnumber: 0,
  }

  let UIModelInstall = {
    titleIcon: 'download',
    title: '安装数（台）',
    number: oldNumber.install_sum,
    compare: 'caret-up',
    compare_num: '正在读取',
    compare_title: '正在读取',
    oldnumber: 0,
  }

  if (!loading) {
    UIModelActivity = {
      titleIcon: 'hdd',
      title: '报活数（次）',
      number: nowdata.activity_sum,
      compare: compareStyle(nowdata.activity_sum, predata.activity_sum),
      compare_num: compareNum(nowdata.activity_sum, predata.activity_sum),
      compare_title: `同比${convertCompare(byDate)}`,
      oldnumber: oldNumber.activity_sum,
    }

    UIModelCompany = {
      titleIcon: 'team',
      title: '企业数（家）',
      number: nowdata.company_num,
      compare: compareStyle(nowdata.company_num, predata.company_num),
      compare_num: compareNum(nowdata.company_num, predata.company_num),
      compare_title: `同比${convertCompare(byDate)}`,
      oldnumber: oldNumber.company_num,
    }

    UIModelInstall = {
      titleIcon: 'download',
      title: '安装数（台）',
      number: nowdata.install_sum,
      compare: compareStyle(nowdata.install_sum, predata.install_sum),
      compare_num: compareNum(nowdata.install_sum, predata.install_sum),
      compare_title: `同比${convertCompare(byDate)}`,
      oldnumber: oldNumber.install_sum,
    }
  }

  return (
    <Row gutter={16}>
      <Col span={8}>
        <CardItem UIModel={UIModelActivity} loading={loading} />
      </Col>
      <Col span={8}>
        <CardItem UIModel={UIModelCompany} loading={loading} />
      </Col>
      <Col span={8}>
        <CardItem UIModel={UIModelInstall} loading={loading} />
      </Col>
    </Row>);
}

CardGroup.propTypes = {};

export default CardGroup;
