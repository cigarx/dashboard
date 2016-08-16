import React, {Component, PropTypes} from 'react';
import {Tooltip, Select, DatePicker, Row, Col} from 'antd';
import styles from './Details.less';
const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;

const SearchOpt = ({
  disabledStartDate,
  disabledEndDate,
  onStartChange,
  onEndChange,
  handleStartToggle,
  handleEndToggle,
  queryOptions
}) => {
  const {byDate,byIndustry,byPage} = queryOptions;
  const {startValue, endValue, endOpen} = byDate;
  const {allIndustrys} = byIndustry;
  const children = allIndustrys.map((item) => {
    return (<Option key={item.industry}>
      {item.industry}
    </Option>)
  });
  return (
    <div className={styles.queryOption}>
      <Tooltip title="以行业维度显示报活数据">
        <span className={styles.labelNote}>选择行业</span>
      </Tooltip>
      <Select defaultValue="政府" className={styles.select}>
        {children}
      </Select>
      <Tooltip title="选择范围后会显示该范文内的报活数据">
        <span className={styles.labelNote}>选择月份范围</span>
      </Tooltip>
      <MonthPicker disabledDate={disabledStartDate} format="yyyy-MM" placeholder="开始月份" onChange={onStartChange} toggleOpen={handleStartToggle}/>
      <span className={styles.note_text}>-</span>
      <MonthPicker disabledDate={disabledEndDate} format="yyyy-MM" placeholder="结束月份" open={endOpen} onChange={onEndChange} toggleOpen={handleEndToggle}/>
    </div>
  );
};
SearchOpt.propTypes = {
  disabledStartDate: PropTypes.func.isRequired,
  disabledEndDate: PropTypes.func.isRequired,
  onStartChange: PropTypes.func.isRequired,
  queryOptions: PropTypes.object.isRequired,
  handleStartToggle: PropTypes.func.isRequired,
  handleEndToggle: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired
}
export default SearchOpt;
