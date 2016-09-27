import React, { Component, PropTypes } from 'react';
import CompanyInfo from './CompanyInfo';
import OrderInfo from './OrderInfo';
import SnInfo from './SnInfo'
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router';
import styles from './Info.less';

import { connect } from 'react-redux';


class CompanyDetails extends Component {

  componentDidMount() {
    const { params, dispatch } = this.props;
    dispatch({ type: 'company/get/info', companyId: params.id });
  }

  render() {
    const { company } = this.props;
    const { companyInfo, orderInfo, snInfo } = company;

    const CompanyInfoProps = {
      info: companyInfo,
    }

    const OrderInfoProps = {
      info: orderInfo,
    }

    const SnInfoProps = {
      info: snInfo,
    }


    return (
      <div>
        <Icon type="caret-circle-left" /><Link to="/company">返回</Link><br />
        <h3>{companyInfo.name} 详情</h3>
        <Row>
          <Col span={8}>
            <CompanyInfo {...CompanyInfoProps} />
          </Col>
        </Row>

        <OrderInfo {...OrderInfoProps} />
        <SnInfo {...SnInfoProps} />
      </div>
    );
  }
}


CompanyDetails.propTypes = {
};


function mapStateToProps({ company }) {
  return {
    company,
  }
}

export default connect(mapStateToProps)(CompanyDetails);
