import React , {Component,PropTypes} from 'react';
import {Row, Col} from 'antd';
import CardGroup from '../Overview/CardGroup';
import Rank from '../Overview/Rank';

const TestingGround = () => {

  return (<div>

    <Row gutter={16}>
      <Col span={16}>
        <CardGroup />
      </Col>
      <Col span={8}>
        <Rank />
      </Col>
    </Row>
  </div>
  )
}

TestingGround.propTypes = {};

export default TestingGround;
