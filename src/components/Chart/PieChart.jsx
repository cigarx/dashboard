import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({ chartData, title, name }) => {
  const { dataName, data, loading, seriesName } = chartData;
  const formatter = '{b} : {c} ({d}%)';
  const option = {
    legend: {
      orient: 'horizontal',
      left: 'left',
      data: dataName,
    },
    tooltip: {
      trigger: 'item',
      formatter,
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (<ReactEcharts
    option={option} showLoading={loading} style={{
      height: 240,
    }}
  />);
};

PieChart.propTypes = {

};

export default PieChart;
