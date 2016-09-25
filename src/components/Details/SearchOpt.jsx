import React, {Component, PropTypes} from 'react';
import {
  Tooltip,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Tag,
  Radio
} from 'antd';
import styles from './Details.less';
import classnames from 'classnames';

const MonthPicker = DatePicker.MonthPicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


const SearchOpt = ({
  global,
  onStartChange,
  queryOptions,
  onOptionChange,
  onInputChange,
  onButtonClick,
  onImportant,
  onChangeRegion,
  onClearQuery,
  onExportData,
  onQueryByChange,
  onProvinceChange,
  onCityChange
}) => {
  const {byDate, byType,byProvince,byCity,keyword,byRegion,isImportant,queryBy} = queryOptions;
  const {typeList,provincesList,cityList,regionList} = global.company;

  const regionShow = classnames({
    [styles.hide]: queryBy != "byRegion",
  });

  const provinceShow = classnames({
    [styles.labelNote]: true,
    [styles.hide]: queryBy != "byProvince",
  });

  let typechildren = [];
  if (typeList && !typeList.loading){

    typechildren = typeList.types.map((item) => {
      return (
        <Option key={item.type}>
          {item.type}
        </Option>
      )
    });
  }
  let provincechildren = [];
  if (provincesList && !provincesList.loading){
    provincechildren = provincesList.provinces.map((item) => {
      return (
        <Option key={item.province}>
          {item.province}
        </Option>
      )
    });
  }

  let citychildren = [];
  if (cityList && !cityList.loading){
    citychildren = cityList.citys.map((item) => {
      return (
        <Option key={item.city}>
          {item.city}
        </Option>
      )
    });
  }

  let regionOptions = [];
  if (regionList && !regionList.loading){
      regionOptions = regionList.regions;
  }

  return (
    <div className={styles.queryOption}>
      <div className={styles.panel}>
        <RadioGroup value={queryBy} onChange={onQueryByChange}>
         <Radio key="region" value="byRegion"><span className={styles.labelNote}>按区域</span></Radio>
          <span className={regionShow}>
             <CheckboxGroup options={regionOptions} value={byRegion} defaultValue={byRegion} onChange={onChangeRegion} />
         </span>
         <Radio key="province" value="byProvince"><span className={styles.labelNote}>按省市</span></Radio>
         <div className={provinceShow}>
           <Select defaultValue={byProvince} value={byProvince} className={styles.select} onChange={onProvinceChange}>
             <Option key="all">
               全部省份
             </Option>
             {provincechildren}
           </Select>
           <Select defaultValue={byCity} value={byCity} className={styles.select} onChange={onCityChange}>
             <Option key="all">
               全部城市
             </Option>
             {citychildren}
           </Select>
        </div>
       </RadioGroup>
      </div>

      <div className={styles.panel}>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.labelNote}>选择行业</span>
        </Tooltip>

        <Select defaultValue={byType} value={byType} className={styles.select} onChange={onOptionChange}>
          <Option key="all">
            全部行业
          </Option>
          {typechildren}
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

        <Button  className={styles.clearBtn} type="primary" icon="export" onClick={onExportData}>导出数据</Button>
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
  onExportData:PropTypes.func.isRequired,
  onQueryByChange:PropTypes.func.isRequired,
  global:PropTypes.object.isRequired,
  onProvinceChange:PropTypes.func.isRequired,
  onCityChange:PropTypes.func.isRequired,
}
export default SearchOpt;
