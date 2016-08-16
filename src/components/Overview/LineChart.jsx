import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const LineChart = () => {
  const option = {
            tooltip: {},
            legend: {
                data:['使用量']
            },
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {},
            series: [{
                name: '使用量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
  return (
    <ReactEcharts option={option} style={{
      height: 300
    }}/>
  );
};

LineChart.propTypes = {
};

export default LineChart;
