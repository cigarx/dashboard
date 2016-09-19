import React, {Component, PropTypes} from 'react';
import {Tooltip, Select, DatePicker,Checkbox, Row, Col,Input,Button,Icon,Tag} from 'antd';
import styles from './Details.less';
const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;

const CheckboxGroup = Checkbox.Group;

const SearchOpt = ({
  onStartChange,
  queryOptions,
  onOptionChange,
  onInputChange,
  onButtonClick,
  onImportant,
  onChangeRegion,
  onClearQuery
}) => {
  const {byDate, byType,keyword,byRegion,isImportant} = queryOptions;
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
  const regionOptions = ['东北区', '华北区', '华东区','华南区', '西北区', '西南区','港澳台'];
  return (
    <div className={styles.queryOption}>
      <div className={styles.panel}>
        <span className={styles.labelNote}>  <Icon type="appstore" />
        <CheckboxGroup options={regionOptions} value={byRegion} defaultValue={byRegion} onChange={onChangeRegion} />
        </span>
      </div>

      <div className={styles.panel}>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.labelNote}>选择行业</span>
        </Tooltip>

        <Select defaultValue={type} value={type} className={styles.select} onChange={onOptionChange}>
          <Option key="all">
            全部行业
          </Option>
          {children}
        </Select>

        <Tooltip title="选择范围后会显示该范文内的报活数据">
          <span className={styles.labelNote}>选择月份</span>
        </Tooltip>
        <MonthPicker value={byDate} format="yyyy-MM" placeholder="开始月份" onChange={onStartChange}/>

        <Checkbox checked={isImportant} onChange={onImportant}>只显示重点用户</Checkbox>

      </div>

      <div className={styles.queryKey} >
        <Tooltip title="以关键字查询企业">
          <span className={styles.labelNote}>关键字</span>
        </Tooltip>
        <Input onChange={onInputChange} value={keyword}/>
        <Button type="primary" icon="search" onClick={onButtonClick}>搜索</Button>
        <Button  className={styles.clearBtn} type="default" icon="reload" onClick={onClearQuery}>清空搜索条件</Button>
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
  onImportant : PropTypes.func.isRequired,
  onChangeRegion : PropTypes.func.isRequired,
  onClearQuery:PropTypes.func.isRequired,
}
export default SearchOpt;
