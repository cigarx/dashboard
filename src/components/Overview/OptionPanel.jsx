import React , {Component,PropTypes} from 'react';
import styles from './overView.less';

const OptionPanel = (props) => {
  return (
      <div className={styles.option}>
        {props.children}
      </div>
  );
}

OptionPanel.propTypes = {};

export default OptionPanel;
