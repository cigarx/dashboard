import React, {Component, PropTypes} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Row, Col,Tooltip,Select,DatePicker,Card,Button,Collapse,Badge,Table} from 'antd';
import DemoCharts from './DemoCharts';
import LineChart from './LineChart';
import MapChart from './MapChart';
import {connect} from 'react-redux';
import styles from './overView.less';
const {MonthPicker} = DatePicker;
const {Panel} =  Collapse;

const Overview = ({mapdata,InstallByIndustry,BuyByIndustry,SummarlData,LineData,dispatch}) => {

  const {nowdata,predata,loading,byData} = SummarlData;
  let now_month,pre_month;
  if(!loading){
    now_month = byData.getMonth() + 1;
    pre_month = byData.getMonth() == 0 ? 12 : byData.getMonth();
  }

  const onStartChange = (value) => {
    if (value !== null) {
      const payload = value;
      dispatch({type: 'chart/set/summarlData/byDate', payload: payload});
      dispatch({
        type: 'chart/get/summarlData',
        query: payload
      });

      dispatch({type: 'chart/set/linedata/byDate', payload: payload});
      dispatch({
        type: 'chart/get/linedata',
        query: payload
      });
    }
  };

  return (
    <div className={styles.overview}>
    <Row>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.labelNote}>选择行业</span>
        </Tooltip>
        <Select defaultValue="全部" className={styles.select} >
          <Option value="all">全部</Option>
          <Option value="金融">金融</Option>
          <Option value="政府">政府</Option>
          <Option value="央企">央企</Option>
          <Option value="国产化">国产化</Option>
          <Option value="新方案">新方案</Option>
          <Option value="港澳台">港澳台</Option>
        </Select>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.labelNote}>月份调整</span>
        </Tooltip>
        <MonthPicker value={byData} format="yyyy-MM" onChange={onStartChange}/>
    </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Row gutter={16} className={styles.card}>
            <Col span={8}>
              <Card title="报活企业数">{pre_month}月  {predata.company_num} 家 <br/>{now_month}月 {nowdata.company_num}家 </Card>
            </Col>
            <Col span={8}>
              <Card title="月报活数">{pre_month}月  {predata.activity_sum} <br/>{now_month}月 {nowdata.activity_sum} </Card>
            </Col>
            <Col span={8}>
              <Card title="新增安装数">{pre_month}月 {predata.install_sum} <br/> {now_month}月 {nowdata.install_sum}</Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <section className={styles.cardBox}>
              <LineChart title={"本月汇总"} lineData = {LineData}/>
            </section>
          </Row>
        </Col>
        <Col span={14}>
          <Row gutter={16}>
            <Col span={12} >
              <section className={styles.cardBox}>
                <DemoCharts chartData={InstallByIndustry} title={"安装量统计"} name={"安装量"}/>
              </section>
            </Col>
            <Col span={12}>
              <section className={styles.cardBox}>
                <DemoCharts chartData={BuyByIndustry} title={"采购量统计"} name={"采购量"}/>
              </section>
            </Col>
          </Row>
          <Row>
            <section className={styles.cardBox}>
              <MapChart mapData={mapdata} className={styles.map}/>
            </section>
          </Row>
        </Col>
        {/*
        <Col span={4}>
        <Row gutter={16}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="企业报活数 Top 10" key="1">
              <Table columns={columns} dataSource={data} size="small" pagination={false}/>
            </Panel>
            <Panel header="临近服务期企业报活数 Top 10" key="2">
              <Table columns={columns} dataSource={data} size="small" pagination={false}/>
            </Panel>
            <Panel header="企业安装数 Top 10" key="3">
              <Table columns={columns} dataSource={data} size="small" pagination={false}/>
            </Panel>
          </Collapse>
        </Row>
        </Col>
        */}
      </Row>
    </div>
  );
};

Overview.propTypes = {};

const changeName = (name) => {
   return name.replace("省",'').replace("市",'').replace("特别行政区",'')
   .replace("自治区",'').replace("回族",'').replace("壮族",'').replace("维吾尔",'')
}

const conver = (data) => {
  if (!data.loading) {
    const newList = data.data.map(item => {
      return {
        name: changeName(item.name),
        value: Number(item.value)
      }
    });
    return newList;
  }
  return []
}

const converLine =(line) =>{
  if (!line.loading) {
    let install_data =[];
    let active_data = [];
    let day_data = [];
    for (var i = 0; i < line.data.length; i++) {
      day_data.push(line.data[i].day);
      install_data.push(line.data[i].install_sum);
      active_data.push(line.data[i].active_sum);
    }
    return {
      day:day_data,
      install:install_data,
      active:active_data
    };
  }
  return {
    day:[],
    install:[],
    active:[]
  };
}

const keyvalue = (data) => {
  if(!data.loading){
    const numberList =  data.data.map(item => {
      return  Number(item.value)
    })
    let sum = 0;
    for (var i = 0; i < numberList.length; i++) {
       sum += numberList[i]
    }
    return { min : 1500 , max: Math.trunc(sum/numberList.length) * 1.1}
  }
  return {}
}


function mapStateToProps({chartdata}) {
  return {
    mapdata: {
      'data': conver(chartdata.salesData),
      'keyvalue': keyvalue(chartdata.salesData),
      loading:chartdata.salesData.loading
    },
    InstallByIndustry:{
      'data': conver(chartdata.InstallByIndustry),
      loading:chartdata.InstallByIndustry.loading
    },
    BuyByIndustry:{
      'data': conver(chartdata.BuyByIndustry),
      loading:chartdata.BuyByIndustry.loading
    },
    SummarlData:{
      nowdata: chartdata.SummarlData.nowdata,
      predata: chartdata.SummarlData.predata,
      byData: chartdata.SummarlData.byDate,
      loading: chartdata.SummarlData.loading
    },
    LineData:{
      data:converLine(chartdata.LineData),
      loading: chartdata.LineData.loading,
      show:false
    }
  }
}

export default connect(mapStateToProps)(Overview);
