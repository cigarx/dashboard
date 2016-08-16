import React, {Component, PropTypes} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Row, Col} from 'antd';
import DemoCharts from './DemoCharts';
import LineChart from './LineChart';

const Overview = () => {
  return (
    <div>
      <h1>概览页面</h1>
      <Row>
        <Col span={12}>
          <DemoCharts/>
        </Col>
        <Col span={12}>
          <LineChart/>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <LineChart/>
        </Col>
        <Col span={12}>
          <DemoCharts/>
        </Col>
      </Row>
    </div>
  );
};

Overview.propTypes = {};

export default Overview;
