import React, {Component, PropTypes} from 'react';
import {Tooltip, Select, DatePicker, Row, Col,Input,Button} from 'antd';
import styles from './Details.less';
const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;

const SearchOpt = ({
  onStartChange,
  queryOptions,
  onOptionChange,
  onInputChange,
  onButtonClick
}) => {
  const {byDate, byIndustry,keyword} = queryOptions;
  const {Industries,industry,loading} = byIndustry;
  let children = [];
  if (!byIndustry.loading){
    children = Industries.map((item) => {
      return (
        <Option key={item.industry}>
          {item.industry}
        </Option>
      )
    });
  }

  return (
    <div className={styles.queryOption}>
      <Tooltip title="以行业维度显示报活数据">
        <span className={styles.labelNote}>选择行业</span>
      </Tooltip>

      <Select defaultValue={industry} className={styles.select} onChange={onOptionChange}>
        <Option key="all">
          全部行业
        </Option>
        {children}
      </Select>

      <Tooltip title="选择范围后会显示该范文内的报活数据">
        <span className={styles.labelNote}>选择月份范围</span>
      </Tooltip>

      <MonthPicker value={byDate} format="yyyy-MM" placeholder="开始月份" onChange={onStartChange}/>

      <div className={styles.queryKey} >
        <Tooltip title="以关键字查询企业">
          <span className={styles.labelNote}>关键字</span>
        </Tooltip>
        <Input onChange={onInputChange} value={keyword}/>
        <Button type="primary" icon="search" onClick={onButtonClick}>搜索</Button>
      </div>

    </div>
  );
};
SearchOpt.propTypes = {
  onStartChange: PropTypes.func.isRequired,
  queryOptions: PropTypes.object.isRequired,
  onOptionChange : PropTypes.func.isRequired,
  onInputChange : PropTypes.func.isRequired,
  onButtonClick:PropTypes.func.isRequired,
}
export default SearchOpt;
