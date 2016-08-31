import React, {Component, PropTypes} from 'react';
import DetailTable from './DetailTables';
import SearchOpt from './SearchOpt';
import LineChart from '../Overview/LineChart'
import {Modal} from 'antd';
var u = require('updeep');

import {connect} from 'react-redux';

const Details = (props) => {
  const {list, loading, queryOptions, dispatch, mylayout,LineData} = props;
  const {byDate, byPage , byIndustry} = queryOptions;
  const model = mylayout.model;

  const onStartChange = (value) => {
    if (value !== null) {
      const payload = value;
      dispatch({type: 'company/queryOpt/set/startDate', payload: payload});
      dispatch({type: 'company/queryOpt/set/currentPage', payload: 1});
      dispatch({
        type: 'company/get/companies',
        query: u.updateIn('byDate', payload, u.updateIn('byPage.current', 1, queryOptions))
      });
    }
  };

  const onOptionChange = (value) => {
    const payload = value;
    dispatch({type: 'company/queryOpt/set/industry', payload: payload});
    dispatch({type: 'company/queryOpt/set/currentPage', payload: 1});
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byIndustry.industry', payload, u.updateIn('byPage.current', 1, queryOptions))
    });
  }

  const handleInputChange = (e) =>{
    dispatch({type: 'company/queryOpt/set/keyword', payload: e.target.value});
  }

  const handleButtonClick = ()=>{
    console.log(queryOptions);
    dispatch({
      type: 'company/get/companies',
      query:  u.updateIn('byPage.current', 1, queryOptions)
    });
  }

  const onShowChart = (value) => {
    dispatch({type: 'uioption/set/model', payload: value});
    dispatch({type: 'uioption/showChart', payload: true});
    dispatch({type: 'company/get/linedata', query: value.id});
  }
  const setModal2Visible = (value) => {
    dispatch({type: 'uioption/showChart', payload: value});
  }

  const onExpandedRowsChange =(value) => {
    // console.log("onExpandedRowsChange");
  }

  const onExpand =(obj,record) => {
    console.log("onExpand");
    console.log(record);
    console.log(obj);
  }


  const onTableChange = (pagination, filters, sorter) => {
    console.log("onTableChange",pagination, filters, sorter );
    // 点击分页、筛选、排序时触发
    let payload = {}
    if(sorter.field){
      payload = {
        order: sorter.order,
        field: sorter.field
      }
    }
    dispatch({type: 'company/queryOpt/set/sorter', payload: payload});
    dispatch({type: 'company/queryOpt/set/currentPage', payload: pagination.current});
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('sorter', payload, u.updateIn('byPage.current', pagination.current, queryOptions))
    });

  }

  return (
    <div>
      <SearchOpt queryOptions={queryOptions} onStartChange={onStartChange}
        onOptionChange={onOptionChange} onInputChange={handleInputChange}
        onButtonClick={handleButtonClick}/>
      <DetailTable loading={loading} data={list} byPage={byPage} onTableChange={onTableChange}
      onShowChart={onShowChart} onExpandedRowsChange={onExpandedRowsChange} onExpand={onExpand}/>
      <Modal title={model
        ? model.name
        : "企业名称"} wrapClassName="vertical-center-modal" visible={mylayout.showChart}
        onOk={() => setModal2Visible(false)} onCancel={() => setModal2Visible(false)}>
        <LineChart title={"安装、使用情况汇总"} lineData = {LineData}/>
      </Modal>
    </div>
  );
};

Details.propTypes = {};

const  _getPercent  = (value,total) => {
  if (isNaN(total) || total == 1) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(value * 10000) / 100.00 + "%");
}

const conver = (data) => {
  if(!data.loading){
    return data.list.map(item => {
      let bydate = item.year + '.' + item.month;
      let result =  {
         name: item.name,
         id : item.company_id,
         groupid:item.group_id,
         industry: item.industry,
         buy_number: item.buy_number == 1 ? "场地授权" : item.buy_number ,
         byDate : bydate,
         install_total : item.install_total,
         activity_avg:item.activity_avg,
         activity_sum:item.activity_sum,
         install_rate:_getPercent(item.install_rate,item.buy_number),
         user_rate:_getPercent(item.user_rate,item.buy_number),
       }
      return result;
    });
  }
  else{
      return [];
  }
}

const converLine =(line) =>{

  if (!line.loading) {
    let install_data =[];
    let active_data = [];
    let day_data = [];
    for (var i = 0; i < line.data.length; i++) {
      day_data.push([line.data[i].year, line.data[i].month, line.data[i].day].join('/'));
      install_data.push(line.data[i].install_sum);
      active_data.push(line.data[i].activity_sum);
    }
    return {
      day:day_data,
      install:install_data,
      active:active_data,
    };
  }
  return {
    day:[],
    install:[],
    active:[]
  };
}

function mapStateToProps(value) {
  const {companys, mylayout} = value;
  return {
    list: conver(companys),
    loading: companys.loading,
    queryOptions: companys.queryOptions,
    mylayout: mylayout,
    LineData:{
      data:converLine(companys.LineData),
      loading: companys.LineData.loading,
      show:true,
      startValue: '2016/8/1',
      endValue: '2016/8/25',
    }
  };
}

export default connect(mapStateToProps)(Details);
