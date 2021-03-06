import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ title, lineData }) => {
  const { day, install, active } = lineData.data
  const installType = lineData.install_type || 'line';
  const activityType = lineData.activity_type || 'line';
  let option = {
    title: {
      text: title,
      x: 'center',
      align: 'right',
    },
    legend: {
      data: ['安装量', '报活量'],
      x: 'left',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day,
    },
    yAxis: [
      {
        name: '安装量数据轴',
        type: 'value',
      },

      {
        name: '报活量数据轴',
        type: 'value',
      },


    ],
    series: [
      {
        name: '安装量',
        type: installType,
        data: install,
        barWidth: 15,
      },
      {
        name: '报活量',
        type: activityType,
        data: active,
        yAxisIndex: 1,
        markLine: {
          data: [
                        { type: 'average', name: '平均值' },
          ],
        },
      },
    ],
  };

  if (lineData.show) {
    option = { ...option,
      dataZoom: [
        {
          show: true,
          realtime: true,
          startValue: lineData.startValue,
          endValue: lineData.endValue,
        },
        {
          type: 'inside',
          realtime: true,
          startValue: lineData.startValue,
          endValue: lineData.endValue,
        },
      ] }
  }
  return (
    <ReactEcharts
      option={option} showLoading={lineData.loading} style={{
        height: 400,
      }}
    />
  );
};

LineChart.propTypes = {
};

export default LineChart;
