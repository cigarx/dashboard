import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const DemoCharts = ({chartData,title,name}) => {
  let {data,loading} = chartData;
  const option = {
    title : {
        text: title,
        x:'10%'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: name,
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };

  return (<ReactEcharts option={option} showLoading={loading}  style={{
    height: 200
  }}/>);
};

DemoCharts.propTypes = {

};

export default DemoCharts;
