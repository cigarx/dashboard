import React, { PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Row, Col, Radio, Tooltip, Select } from 'antd';
import LineChart from '../Chart/LineChart';
import PieChart from '../Chart/PieChart';
import Panel from './Panel';

import CardGroup from './CardGroup';
import Rank from './Rank';
import { connect } from 'react-redux';
import styles from './overView.less';


const u = require('updeep');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Overview extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'chart/get/summarlData' });
    dispatch({ type: 'chart/get/linedata' });
    dispatch({ type: 'chart/get/versionData' });
    dispatch({ type: 'chart/get/toptenData' });
  }
  render() {
    const { versionData, SummarlData, LineData, TopTenData, dispatch, global, queryOption } = this.props;
    const { nowdata, predata, loading } = SummarlData;
    const { byDate, byType, show } = queryOption;

    const { typeList } = global;
    let typechildren = [];
    if (typeList && !typeList.loading) {
      typechildren = typeList.types.map((item) => {
        return (
          <Option key={item.type}>
            {item.type}
          </Option>
      )
      });
    }

    const convertTitle = (date) => {
      const constDate = {
        weekly: '本周',
        daily: '今日',
        monthly: '本月',
      }
      return constDate[date]
    }


    const convertType = (type) => {
      if (type === 'all') {
        return '所有行业'
      }
      return type;
    }


    const onChangeDate = (e) => {
      dispatch({ type: 'chart/queryOpt/set/date', payload: e.target.value });
      dispatch({ type: 'chart/set/oldNumber', payload: nowdata });
      dispatch({
        type: 'chart/get/versionData',
        query: {
          date: e.target.value,
          type: byType,
          order: show,
        },
      });

      dispatch({
        type: 'chart/get/toptenData',
        query: {
          date: e.target.value,
          type: byType,
          order: show,
        },
      });

      dispatch({
        type: 'chart/get/linedata',
        query: {
          date: e.target.value,
          type: byType,
        },
      });

      dispatch({
        type: 'chart/get/summarlData',
        query: {
          date: e.target.value,
          type: byType,
        },
      });
    }

    const onChangeOrder = (e) => {
      dispatch({ type: 'chart/queryOpt/set/show', payload: e.target.value });
      dispatch({
        type: 'chart/get/versionData',
        query: {
          date: byDate,
          type: byType,
          order: e.target.value,
        },
      });
      dispatch({
        type: 'chart/get/toptenData',
        query: {
          date: byDate,
          type: byType,
          order: e.target.value,
        },
      });
    }

    const onChangeType = (value) => {
      dispatch({ type: 'chart/queryOpt/set/type', payload: value });
      dispatch({ type: 'chart/set/oldNumber', payload: nowdata });
      dispatch({
        type: 'chart/get/versionData',
        query: {
          date: byDate,
          type: value,
          order: show,
        },
      });
      dispatch({
        type: 'chart/get/toptenData',
        query: {
          date: byDate,
          type: value,
          order: show,
        },
      });
      dispatch({
        type: 'chart/get/linedata',
        query: {
          date: byDate,
          type: value,
        },
      });
      dispatch({
        type: 'chart/get/summarlData',
        query: {
          date: byDate,
          type: value,
        },
      });
    }

    const summarlOption = (
      <div>
        <Tooltip title="以行业维度显示报活数据">
          <span className={styles.typeText}>选择行业</span>
        </Tooltip>
        {/*eslint max-len: ["error", 150, 4]*/}
        <Select defaultValue={byType} value={byType} className={styles.select} onChange={onChangeType}>
          <Option key="all">
            全部行业
          </Option>
          {typechildren}
        </Select>

        <RadioGroup defaultValue={byDate} onChange={onChangeDate}>
          <RadioButton value="monthly">近 30 日</RadioButton>
          <RadioButton value="weekly">近 7 日</RadioButton>
          <RadioButton value="daily">今日</RadioButton>
        </RadioGroup>
      </div>
  )

    const versionOption = (
      <RadioGroup defaultValue={show} onChange={onChangeOrder}>
        <RadioButton value="install_sum">安装量</RadioButton>
        <RadioButton value="activity_sum">报活次数</RadioButton>
      </RadioGroup>
    )
    const setTitle = (desc) => {
      return `${convertTitle(byDate)}${desc} (${convertType(byType)}) `;
    }
    const setTitleByInstall = (desc) => {
      const installDesc = show === 'install_sum' ? '安装次数' : '报活次数'
      return `${convertTitle(byDate)}${installDesc} ${desc} (${convertType(byType)}) `;
    }

    return (
      <div className={styles.overview}>
        <Row gutter={16}>
          <Col span={15}>
            <Panel title={setTitle('统计汇总')} Options={summarlOption}>
              <CardGroup SummarlData={SummarlData} byDate={byDate} />
            </Panel>
            <Panel title={setTitle('报活详情')}>
              <LineChart lineData={LineData} />
            </Panel>
          </Col>
          <Col span={9}>
            <Panel title={setTitleByInstall('版本分布')} Options={versionOption}>
              <PieChart chartData={versionData} />
            </Panel>
            <Panel title={setTitleByInstall(' Top 10')}>
              <Rank TopTenData={TopTenData} />
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {};

const versionName = (version) => {
  if (!version.loading) {
    return version.data.map(item => {
      return item.version;
    });
  }
  return undefined;
}

const versionConver = (version, queryOpt) => {
  if (!version.loading) {
    const newList = version.data.map(item => {
      if (queryOpt.show === 'install_sum') {
        return {
          name: item.version,
          value: Number(item.install_sum),

        }
      } else if (queryOpt.show === 'activity_sum') {
        return {
          name: item.version,
          value: Number(item.activity_sum),
        }
      }
      return undefined;
    });
    return newList;
  }
  return []
}

const toptenConver = (topten, queryOpt) => {
  if (!topten.loading) {
    const newList = topten.data.map((item, index) => {
      if (queryOpt.show === 'install_sum') {
        return {
          id: item.id,
          rank: index + 1,
          name: item.name,
          value: Number(item.install_sum),
        }
      } else if (queryOpt.show === 'activity_sum') {
        return {
          id: item.id,
          rank: index + 1,
          name: item.name,
          value: Number(item.activity_sum),
        }
      }
      return undefined;
    });
    return newList;
  }
  return []
}

const converLine = (line) => {
  if (!line.loading) {
    const installData = [];
    const activeData = [];
    const dayData = [];
    for (let i = 0; i < line.data.length; i++) {
      dayData.push(line.data[i].date);
      installData.push(line.data[i].install_sum);
      activeData.push(line.data[i].active_sum);
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


function mapStateToProps({ chartdata, global }) {
  return {
    versionData: {
      data: versionConver(chartdata.versionData, chartdata.queryOption),
      loading: chartdata.versionData.loading,
      seriesName: chartdata.queryOption.show === 'install_sum' ? '安装量' : '报活次数',
      dataName: versionName(chartdata.versionData),
    },

    SummarlData: {
      nowdata: chartdata.SummarlData.nowdata,
      predata: chartdata.SummarlData.predata,
      loading: chartdata.SummarlData.loading,
      oldNumber: chartdata.SummarlData.oldNumber,
    },

    TopTenData: {
      data: toptenConver(chartdata.TopTenData, chartdata.queryOption),
      loading: chartdata.TopTenData.loading,
      seriesName: chartdata.queryOption.show === 'install_sum' ? '安装量' : '报活次数',
    },

    LineData: {
      data: converLine(chartdata.LineData),
      loading: chartdata.LineData.loading,
      show: true,
      activity_type: 'line',
      install_type: 'bar',
    },
    global: global.company,
    queryOption: chartdata.queryOption,
  }
}

export default connect(mapStateToProps)(Overview);
