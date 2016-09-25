import React, { Component, PropTypes } from 'react';
import CompanyInfo from './CompanyInfo';
import OrderInfo from './OrderInfo';
import SnInfo from './SnInfo'
import {connect} from 'react-redux';


class CompanyDetails extends Component {

  componentDidMount() {
    const {params,dispatch} = this.props;
    console.log(this.props);
    dispatch({type: 'company/get/info', companyId: params.id});
  }

  render() {
    const {company} = this.props;
    const {companyInfo,orderInfo,snInfo} = company;

    const CompanyInfoProps = {
      info : companyInfo
    }

    const OrderInfoProps = {
      info : orderInfo
    }

    const SnInfoProps = {
      info : snInfo
    }

    return(
      <div>
        <h3>{companyInfo.name} 详情</h3>
        <CompanyInfo {...CompanyInfoProps}/>
        <OrderInfo {...OrderInfoProps}/>
        <SnInfo {...SnInfoProps}/>
      </div>
    );
  }
}


CompanyDetails.propTypes = {
};




function mapStateToProps({company}) {
  return {
    company : company
  }
}

export default connect(mapStateToProps)(CompanyDetails);
