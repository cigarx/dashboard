import React, {Component, PropTypes} from 'react';
import DetailTable from './DetailTables';
import SearchOpt from './SearchOpt';
import LineChart from '../Overview/LineChart'
import {Modal} from 'antd';
var u = require('updeep');

import {connect} from 'react-redux';

const Details  = (props) => {
  const {list, loading, queryOptions, dispatch, mylayout,LineData} = props;
  const {byDate, byPage , byType} = queryOptions;
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
    dispatch({type: 'company/queryOpt/set/type', payload: payload});
    dispatch({type: 'company/queryOpt/set/currentPage', payload: 1});
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byType.type', payload, u.updateIn('byPage.current', 1, queryOptions))
    });
  }

  const handleInputChange = (e) =>{
    dispatch({type: 'company/queryOpt/set/keyword', payload: e.target.value});
  }

  const handleButtonClick = ()=>{
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
    // 点击分页、筛选、排序时触发
    let payload = {}
    if(sorter.field){
      payload = {
        order: sorter.order,
        field: sorter.field
      }
    }
    let query = u.updateIn('byPage.pageSize',pagination.pageSize, u.updateIn('byPage.current', pagination.current, queryOptions))
    dispatch({type: 'company/queryOpt/set/sorter', payload: payload});
    dispatch({type: 'company/queryOpt/set/currentPage', payload: pagination.current});
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('sorter', payload, query)
    });

  }

  const handleImportant = (e) => {
    dispatch({type: 'company/queryOpt/set/isImportant', payload: e.target.checked});
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('isImportant', e.target.checked, u.updateIn('byPage.current', 1, queryOptions))
    });
  }

  const onShowSizeChange = (current, pageSize) => {
    dispatch({type: 'company/queryOpt/set/pageSize', payload:pageSize});
  }

  return (
    <div>
      <SearchOpt queryOptions={queryOptions} onStartChange={onStartChange}
        onOptionChange={onOptionChange} onInputChange={handleInputChange}
        onButtonClick={handleButtonClick} onImportant = {handleImportant}/>
      <DetailTable loading={loading} data={list} byPage={byPage} onTableChange={onTableChange}
      onShowChart={onShowChart} onExpandedRowsChange={onExpandedRowsChange} onExpand={onExpand} onShowSizeChange={onShowSizeChange}/>
      <Modal title={model
        ? model.name
        : "企业名称"}
        width = {980}
        wrapClassName="vertical-center-modal" visible={mylayout.showChart}
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
  return  total == 0 ? "0%" : (Math.round(value / total * 10000) / 100.00 + "%");
}

const conver = (data) => {
  if(!data.loading){
    return data.list.map(item => {
      let bydate = item.year + '.' + item.month;
      let result =  {
         name: item.name,
         id : item.companyid,
         region:item.region,
         type: item.type,
         buy_total: item.buy_total == 1 ? "场地授权" : item.buy_total ,
         bydate : bydate,
         important : item.important == 1,
         install_total : item.install_total,
         acitvity_avg:item.acitvity_avg,
         activity_sum:item.activity_sum,
         install_rate:_getPercent(item.install_total,item.buy_total),
         user_rate:_getPercent(item.activity_sum,item.buy_total),
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
