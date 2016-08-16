import React, {Component, PropTypes} from 'react';
import DetailTable from './Tables';
import SearchOpt from './SearchOpt';

import {connect} from 'react-redux';

const Details = (props) => {
  const {company, options, dispatch} = props;
  const {startValue, endValue, endOpen} = options;

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
      dispatch({type: 'companyOpt/set/endOpen', payload: true});
    }
  };
  const handleEndToggle = ({open}) => {
    dispatch({type: 'companyOpt/set/endOpen', payload: open});
  };

  const onStartChange = (value) => {
    if (value === null) {
      dispatch({type: 'companyOpt/set/ChangeStartMon', payload: null});
    } else {
      const startYear = value.getFullYear();
      const startMonth = value.getMonth() + 1;
      dispatch({
        type: 'companyOpt/set/ChangeStartMon',
        payload: {
          startYear: startYear,
          startMonth: startMonth,
          date: value
        }
      });
    }
  };
  const onEndChange = (value) => {
    if (value === null) {
      dispatch({type: 'companyOpt/set/ChangeEndMon', payload: null});
    } else {
      const endYear = value.getFullYear();
      const endMonth = value.getMonth() + 1;
      dispatch({
        type: 'companyOpt/set/ChangeEndMon',
        payload: {
          endYear: endYear,
          endMonth: endMonth,
          date : value
        }
      });
    }
  };

  return (
    <div>
      <SearchOpt
        options = {options}
        disabledStartDate = {disabledStartDate}
        disabledEndDate = {disabledEndDate}
        onStartChange = {onStartChange}
        onEndChange = {onEndChange}
        handleStartToggle = {handleStartToggle}
        handleEndToggle = {handleEndToggle}
      />
      <DetailTable data = {company}/>
    </div>
  );
};

Details.propTypes = {};

const conver = (companies) => {
  const newList = companies.list.map(company => {
    return {name: company.company, industry: company.industry, region: company.region}
  });
  return newList;
}

function mapStateToProps(valus) {
  const {companys} = valus;
  return {company: conver(companys), options:companys.options};
}

export default connect(mapStateToProps)(Details);
