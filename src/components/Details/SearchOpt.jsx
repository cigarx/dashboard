import React, {Component, PropTypes} from 'react';
import {Tooltip, Select, DatePicker,Checkbox, Row, Col,Input,Button,Icon,Tag} from 'antd';
import styles from './Details.less';
const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;

const SearchOpt = ({
  onStartChange,
  queryOptions,
  onOptionChange,
  onInputChange,
  onButtonClick,
  onImportant
}) => {
  const {byDate, byType,keyword} = queryOptions;
  const {types,type,loading} = byType;
  let children = [];
  if (!loading){
    children = types.map((item) => {
      return (
        <Option key={item.type}>
          {item.type}
        </Option>
      )
    });
  }

  return (
    <div className={styles.queryOption}>
      <div className={styles.panel}>
        <span className={styles.labelNote}>  <Icon type="appstore" /></span>

          <Button>东北区</Button>
          <Button>华北区</Button>
          <Button>华东区</Button>
          <Button>华南区</Button>
          <Button>西北区</Button>
          <Button>西南区</Button>
          <Button>港澳台</Button>

      </div>

      <div className={styles.panel}>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.labelNote}>选择行业</span>
        </Tooltip>

        <Select defaultValue={type} className={styles.select} onChange={onOptionChange}>
          <Option key="all">
            全部行业
          </Option>
          {children}
        </Select>

        <Tooltip title="选择范围后会显示该范文内的报活数据">
          <span className={styles.labelNote}>选择月份范围</span>
        </Tooltip>
        <MonthPicker value={byDate} format="yyyy-MM" placeholder="开始月份" onChange={onStartChange}/>

        <Checkbox onChange={onImportant}>只显示重点用户</Checkbox>

      </div>

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
  onButtonClick : PropTypes.func.isRequired,
  onImportant : PropTypes.func.isRequired
}
export default SearchOpt;
