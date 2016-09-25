import React , {Component,PropTypes } from 'react';

const OrderInfo = ({info}) =>  {
  console.log("OrderInfo",info);
  return (<div>
      <span > OrderInfo </span>
    </div>)
}

OrderInfo.propTypes = {};

export default OrderInfo;
