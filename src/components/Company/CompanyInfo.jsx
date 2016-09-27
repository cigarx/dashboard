import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import styles from './Info.less'

const CompanyInfo = ({ info }) => {
  return (
    <div>
      <Row>
        <Col span={15}><span>{info.name}</span></Col>
        <Col span={9}><span>{info.important}</span></Col>
      </Row>
      <Row>
        <Col span={8}><span>{info.type}</span></Col>
        <Col span={8}><span>{info.industry}</span></Col>
      </Row>
      <Row>
        <Col span={8}><span>{info.region}</span></Col>
        <Col span={8}><span>{info.province}</span></Col>
        <Col span={8}><span>{info.city}</span></Col>
      </Row>
      <span>{info.address}</span><br />
    </div>)
}

CompanyInfo.propTypes = {};

export default CompanyInfo
