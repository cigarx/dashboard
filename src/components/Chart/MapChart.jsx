import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';
require('echarts/map/js/china.js');

const MapChart = ({ mapData }) => {
  const { data, keyvalue, loading } = mapData
  let option = {}
  if (!loading) {
    option = {
      title: {
        text: 'WPS 采购数据',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        min: keyvalue.min,
        max: keyvalue.max,
        left: 'left',
        top: 'bottom',
        text: [
          '高', '低',
        ],
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered'],
        },
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: {
            readOnly: false,
          },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: '购买量',
          type: 'map',
          mapType: 'china',
          data,
        },
      ],
    };
  }
  return (<ReactEcharts
    option={option} showLoading={loading} style={{ height: '400px', width: '100%' }}
  />);
};

MapChart.propTypes = {
  mapData: PropTypes.object.isRequired,
};

export default MapChart;
