import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({title,lineData}) => {
  const {day,install,active} = lineData.data
  let option = {
        title: {
            text:title
        },
        legend: {
          data:['安装量','报活量']
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data:day
        },
        yAxis: [
          {
            name: '报活量数据轴',
            type: 'value',
          },
          {
            name: '安装量数据轴',
            type: 'value'
          }

        ],
        series: [
            {
                name:'安装量',
                type:'line',
                data:install,
                yAxisIndex:1,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [
                          {
                              type: 'min'
                          },
                          {
                              name: '最小值到最大值',
                              type: 'max'
                          }
                      ],
                    ]
                }
            },
            {
                name:'报活量',
                type:'line',
                data:active,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [
                          {
                              type: 'min'
                          },
                          {
                              name: '最小值到最大值',
                              type: 'max'
                          }
                      ],
                    ]
                }
            }
        ]
        };
if(lineData.show){
  option = {...option,
      dataZoom: [
              {
                  show: true,
                  realtime: true,
                  startValue: lineData.startValue,
                  endValue: lineData.endValue
              },
              {
                  type: 'inside',
                  realtime: true,
                  startValue: lineData.startValue,
                  endValue: lineData.endValue
              }
          ],}
}
  return (
    <ReactEcharts option={option} showLoading={lineData.loading} style={{
      height: 400
    }}/>
  );
};

LineChart.propTypes = {
};

export default LineChart;
