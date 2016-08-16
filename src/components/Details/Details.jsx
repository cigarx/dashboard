import React, {Component, PropTypes} from 'react';
import DetailTable from './Tables';
import SearchOpt from './SearchOpt';
import LineChart from '../Overview/LineChart'
import {Modal} from 'antd';

import {connect} from 'react-redux';

const Details = (props) => {
  const {companyList, queryOptions, dispatch, mylayout} = props;
  const {byDate, byPage} = queryOptions;
  const {startValue, endValue, endOpen} = byDate;
  const model = mylayout.model ;

  const disabledStartDate = (startValue) => {
    if (!startValue || !endValue.date) {
      return false;
    }
    return startValue.getTime() >= endValue.date.getTime();
  };

  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue.date) {
      return false;
    }
    return endValue.getTime() <= startValue.date.getTime();
  };

  const handleStartToggle = ({open}) => {
    if (!open) {
      dispatch({type: 'queryOpt/set/endOpen', payload: true});
    }
  };
  const handleEndToggle = ({open}) => {
    dispatch({type: 'queryOpt/set/endOpen', payload: open});
  };

  const onStartChange = (value) => {
    if (value !== null) {
      const startYear = value.getFullYear();
      const startMonth = value.getMonth() + 1;
      dispatch({
        type: 'queryOpt/set/startDate',
        payload: {
          startYear: startYear,
          startMonth: startMonth,
          date: value
        }
      });
    }
  };

  const onEndChange = (value) => {
    if (value !== null) {
      const endYear = value.getFullYear();
      const endMonth = value.getMonth() + 1;
      dispatch({
        type: 'queryOpt/set/endDate',
        payload: {
          endYear: endYear,
          endMonth: endMonth,
          date: value
        }
      });
    }
  };

  const onOptionChange = (value) => {
    dispatch({type: 'queryOpt/set/industry', payload: value});
    dispatch({type: 'company/get/companiesByquery', query: value});
  }

  const onPageChange = (value) => {
    console.log(value);
  }
  const onShowChart = (value) => {
    console.log(value);
    dispatch({type: 'uioption/set/model', payload: value});
    dispatch({type: 'uioption/showChart', payload: true});
  }
  const setModal2Visible = (value) => {
    dispatch({type: 'uioption/showChart', payload: value});
  }

  return (
    <div>
      <SearchOpt queryOptions={queryOptions} disabledStartDate={disabledStartDate} disabledEndDate={disabledEndDate} onStartChange={onStartChange} onEndChange={onEndChange} handleStartToggle={handleStartToggle} handleEndToggle={handleEndToggle} onOptionChange={onOptionChange}/>
      <DetailTable data={companyList} byPage={byPage} onPageChange={onPageChange} onShowChart={onShowChart}/>
      <Modal title={model ? model.name : "AAAA"} wrapClassName="vertical-center-modal" visible={mylayout.showChart} onOk={() => setModal2Visible(false)} onCancel={() => setModal2Visible(false)}>
        <LineChart/>
      </Modal>
    </div>
  );
};

Details.propTypes = {};

const conver = (data) => {
  const newList = data.companyList.map(item => {
    return {key: item.id, name: item.company, industry: item.industry, region: item.region}
  });
  return newList;
}

function mapStateToProps(value) {
  const {companys, mylayout} = value;
  return {companyList: conver(companys), queryOptions: companys.queryOptions, mylayout: mylayout};
}

export default connect(mapStateToProps)(Details);
