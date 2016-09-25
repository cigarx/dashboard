import React , {Component,PropTypes} from 'react';
import {Row, Col,Radio,Icon,Tooltip,Select} from 'antd';
import CardItem from './CardItem';
import styles from './Card.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CardGroup = ({SummarlData,byDate}) => {
  const {nowdata,predata,loading} = SummarlData
  const convertCompare = (date) =>{
    const constDate = {
      weekly : '上周',
      daily : '昨日',
      monthly : '上月'
    }
    return constDate[date]
  }

  const compare_style = (nowdata,predata) => {
    if(nowdata >= predata) {
      return "caret-up"
    }
    else{
      return "caret-down"
    }
  }

  const compare_num = (nowdata,predata) => {
    if(nowdata >= predata) {
      return (Math.round((nowdata - predata) / nowdata * 10000) / 100.00 + "%");
    }
    else{
      return (Math.round((predata - nowdata) / nowdata * 10000) / 100.00 + "%");
    }
  }
  let UIModelActivity ={
    titleIcon:'hdd',
    title:"报活数（次）",
    number:NaN,
    compare: "caret-up",
    compare_num:"正在读取",
    compare_title:"正在读取"
  }

  let UIModelCompany ={
    titleIcon:'team',
    title:"企业数（家）",
    number:NaN,
    compare: "caret-up",
    compare_num:"正在读取",
    compare_title:"正在读取"
  }

  let UIModelInstall = {
    titleIcon:'download',
    title:"安装数（台）",
    number:NaN,
    compare: "caret-up",
    compare_num:"正在读取",
    compare_title:"正在读取"
  }

  if(!loading){

   UIModelActivity = {
      titleIcon:'hdd',
      title:"报活数（次）",
      number:nowdata.activity_sum,
      compare: compare_style(nowdata.activity_sum,predata.activity_sum),
      compare_num:compare_num(nowdata.activity_sum,predata.activity_sum),
      compare_title:`同比${convertCompare(byDate)}`
    }

   UIModelCompany = {
      titleIcon:'team',
      title:"企业数（家）",
      number:nowdata.company_num,
      compare: compare_style(nowdata.company_num,predata.company_num),
      compare_num:compare_num(nowdata.company_num,predata.company_num),
      compare_title:`同比${convertCompare(byDate)}`
    }

    UIModelInstall = {
      titleIcon:'download',
      title:"安装数（台）",
      number:nowdata.install_sum,
      compare: compare_style(nowdata.install_sum,predata.install_sum),
      compare_num:compare_num(nowdata.install_sum,predata.install_sum),
      compare_title:`同比${convertCompare(byDate)}`
    }
  }

  return (
    <Row gutter={16}>
      <Col span={8}>
        <CardItem UIModel={UIModelActivity}/>
      </Col>
      <Col span={8}>
        <CardItem UIModel={UIModelCompany}/>
      </Col>
      <Col span={8}>
        <CardItem UIModel={UIModelInstall}/>
      </Col>
    </Row>);
}

CardGroup.propTypes = {};

export default CardGroup;
