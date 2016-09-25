import React , {Component,PropTypes} from 'react';
import OptionPanel from './OptionPanel';
import {Row} from 'antd';
import styles from './overView.less';

const Panel = (props) => {
  const {title,Options} = props;
  
  return (
    <div className={styles.panle}>
      <Row>
        <span className={styles.title}>{title}</span>
        <OptionPanel>
          {Options}
        </OptionPanel>
      </Row>
      {props.children}
    </div>
  )
}

Panel.propTypes = {};

export default Panel;
