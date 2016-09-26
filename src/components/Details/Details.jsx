import React, { Component, PropTypes } from 'react';
import DetailTable from './DetailTables';
import SearchOpt from './SearchOpt';
import LineChart from '../Chart/LineChart'
import { Modal } from 'antd';
import { connect } from 'react-redux';

const u = require('updeep');

const Details = (props) => {
  const { list, loading, queryOptions, dispatch, mylayout, LineData, routing, global } = props;
  const { byDate, byPage, byType, byRegion } = queryOptions;
  const model = mylayout.model;

  const onStartChange = (value) => {
    if (value !== null) {
      const payload = value;
      dispatch({ type: 'company/queryOpt/set/startDate', payload });
      dispatch({ type: 'company/queryOpt/set/currentPage', payload: 1 });
      dispatch({
        type: 'company/get/companies',
        query: u.updateIn('byDate', payload, u.updateIn('byPage.current', 1, queryOptions)),
      });
    }
  };

  const onOptionChange = (value) => {
    const payload = value;
    dispatch({ type: 'company/queryOpt/set/type', payload });
    dispatch({ type: 'company/queryOpt/set/currentPage', payload: 1 });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byType', payload, u.updateIn('byPage.current', 1, queryOptions)),
    });
  }

  const onProvinceChange = (value) => {
    const payload = value;
    dispatch({ type: 'company/queryOpt/set/province', payload });
    dispatch({ type: 'global/company/citys', query: payload })
    dispatch({ type: 'company/queryOpt/set/city', payload: 'all' });
    dispatch({ type: 'company/queryOpt/set/currentPage', payload: 1 });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byCity', 'all',
                u.updateIn('byProvince', payload,
                u.updateIn('byPage.current', 1, queryOptions))),
    });
  }

  const onCityChange = (value) => {
    const payload = value;
    dispatch({ type: 'company/queryOpt/set/city', payload });
    dispatch({ type: 'company/queryOpt/set/currentPage', payload: 1 });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byCity', payload, u.updateIn('byPage.current', 1, queryOptions)),
    });
  }

  const handleInputChange = (e) => {
    dispatch({ type: 'company/queryOpt/set/keyword', payload: e.target.value });
  }

  const handleButtonClick = () => {
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byPage.current', 1, queryOptions),
    });
  }

  const onShowChart = (value) => {
    dispatch({ type: 'uioption/set/model', payload: value });
    dispatch({ type: 'uioption/showChart', payload: true });
    dispatch({ type: 'company/get/linedata', query: value.id });
  }
  const setModal2Visible = (value) => {
    dispatch({ type: 'uioption/showChart', payload: value });
  }

  const onExpandedRowsChange = (value) => {
    // console.log("onExpandedRowsChange");
  }

  const onExpand = (obj, record) => {
    // console.log('onExpand');
    // console.log(record);
    // console.log(obj);
  }


  const onTableChange = (pagination, filters, sorter) => {
    // 点击分页、筛选、排序时触发
    let payload = {}
    if (sorter.field) {
      payload = {
        order: sorter.order,
        field: sorter.field,
      }
    }
    const query = u.updateIn('byPage.pageSize',
      pagination.pageSize, u.updateIn('byPage.current',
      pagination.current, queryOptions))
    dispatch({ type: 'company/queryOpt/set/sorter', payload });
    dispatch({ type: 'company/queryOpt/set/currentPage', payload: pagination.current });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('sorter', payload, query),
    });
  }

  const handleImportant = (e) => {
    dispatch({ type: 'company/queryOpt/set/isImportant', payload: e.target.checked });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('isImportant',
      e.target.checked, u.updateIn('byPage.current', 1, queryOptions)),
    });
  }

  const onShowSizeChange = (current, pageSize) => {
    dispatch({ type: 'company/queryOpt/set/pageSize', payload: pageSize });
  }

  const onChangeRegion = (checkedValues) => {
    dispatch({ type: 'company/queryOpt/set/byRegion', payload: checkedValues });
    dispatch({
      type: 'company/get/companies',
      query: u.updateIn('byRegion', checkedValues, queryOptions),
    });
  }

  const onClearQuery = () => {
    dispatch({ type: 'company/queryOpt/set/byRegion', payload: [] });
    dispatch({ type: 'company/queryOpt/set/isImportant', payload: false });
    dispatch({ type: 'company/queryOpt/set/province', payload: 'all' });
    dispatch({ type: 'company/queryOpt/set/city', payload: 'all' });
    dispatch({ type: 'company/queryOpt/set/queryBy', payload: 'byRegion' });
    dispatch({ type: 'company/queryOpt/set/sorter', payload: {} });
    dispatch({ type: 'company/queryOpt/set/type', payload: 'all' });
    dispatch({ type: 'company/queryOpt/set/startDate', payload: new Date() });
    dispatch({ type: 'company/queryOpt/set/currentPage', payload: 1 });
    dispatch({ type: 'company/queryOpt/set/keyword', payload: '' });
    dispatch({
      type: 'company/get/companies',
    });
  }

  const onExportData = () => {
    dispatch({
      type: 'company/exportData',
      query: queryOptions,
      title: '企业报活数据',
    });
  }

  const onQueryByChange = (e) => {
    dispatch({ type: 'company/queryOpt/set/byRegion', payload: [] });
    if (e.target.value === 'byRegion') {
      dispatch({ type: 'company/queryOpt/set/province', payload: 'all' });
      dispatch({ type: 'company/queryOpt/set/city', payload: 'all' });
    }
    dispatch({ type: 'company/queryOpt/set/queryBy', payload: e.target.value });
  }

  const SearchOptProps = {
    global,
    queryOptions,
    onStartChange,
    onQueryByChange,
    onOptionChange,
    onInputChange: handleInputChange,
    onClearQuery,
    onExportData,
    onButtonClick: handleButtonClick,
    onImportant: handleImportant,
    onChangeRegion,
    onProvinceChange,
    onCityChange,
  };

  const DetailTableProps = {
    loading,
    data: list,
    byPage,
    onTableChange,
    onShowChart,
    onExpandedRowsChange,
    onExpand,
    onShowSizeChange,
    routing,
  }

  const ModalProps = {
    title: model ? model.name : '企业名称',
    width: 980,
    wrapClassName: 'vertical-center-modal',
    visible: mylayout.showChart,
    onOk: () => setModal2Visible(false),
    onCancel: () => setModal2Visible(false),
  }

  return (
    <div>
      <SearchOpt {...SearchOptProps} />
      <DetailTable {...DetailTableProps} />
      <Modal {...ModalProps}>
        <LineChart title={"安装、使用情况汇总"} lineData={LineData} />
      </Modal>
    </div>
  );
};

Details.propTypes = {};

const getPercent = (value, total) => {
  if (isNaN(total) || total === 1) {
    return '-';
  }
  return total === 0 ? '0%' : `${Math.round(value / total * 10000) / 100.00}%`;
}

const conver = (data) => {
  if (!data.loading) {
    return data.list.map(item => {
      const bydate = `${item.year}.${item.month}`;
      const result = {
        name: item.name,
        id: item.companyid,
        region: item.region,
        server_num: item.server_num === 1 ? '外网数据' : '多数据源',
        type: item.type,
        buy_total: item.buy_total === 1 ? '场地授权' : item.buy_total,
        bydate,
        important: item.important === 1,
        install_sum: item.install_sum,
        install_total: item.install_total,
        acitvity_avg: item.acitvity_avg,
        activity_sum: item.activity_sum,
        install_rate: getPercent(item.install_total, item.buy_total),
        user_rate: getPercent(item.activity_sum, item.buy_total),
      }
      if (item.server_num > 1) {
        result.children = []
      }
      return result;
    });
  }
  return [];
}

const converLine = (line) => {
  if (!line.loading) {
    const installData = [];
    const activeData = [];
    const dayData = [];
    for (let i = 0; i < line.data.length; i++) {
      dayData.push([line.data[i].year, line.data[i].month, line.data[i].day].join('/'));
      installData.push(line.data[i].install_sum);
      activeData.push(line.data[i].activity_sum);
    }
    return {
      day: dayData,
      install: installData,
      active: activeData,
    };
  }
  return {
    day: [],
    install: [],
    active: [],
  };
}

function mapStateToProps(state, ownProps) {
  const { companies, mylayout, global } = state;
  return {
    list: conver(companies),
    loading: companies.loading,
    queryOptions: companies.queryOptions,
    mylayout,
    LineData: {
      data: converLine(companies.LineData),
      loading: companies.LineData.loading,
      show: true,
      install_type: 'bar',
    },
    routing: ownProps,
    global,
  };
}

export default connect(mapStateToProps)(Details);
