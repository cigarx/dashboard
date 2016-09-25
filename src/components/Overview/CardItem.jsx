import React , {Component,PropTypes} from 'react';
import { Icon } from 'antd';
import CountUp from 'react-countup';
import classnames from 'classnames';


import styles from './Card.less';

const CardItem = ({UIModel}) => {
  const iconSytle = classnames({
      [styles.icon_down]: UIModel.compare=="caret-down",
      [styles.icon_up]:UIModel.compare=="caret-up",
    });
    
  return (
    <div className={styles.card_box} >
      <div className={styles.title}>
        <Icon  className={styles.icon} type={UIModel.titleIcon}/>
        <span>{UIModel.title}</span>
      </div>
      <div className={styles.number}>
        <span><CountUp start={0} end={UIModel.number} duration={2} /></span>
      </div>
      <div className={styles.compare}>
        <Icon type={UIModel.compare} className={iconSytle} />
        <span className={iconSytle}>
          {UIModel.compare_num}
        </span>
        <span className={styles.text}>{UIModel.compare_title}</span>
      </div>
    </div>
  );
}

CardItem.propTypes = {};

export default CardItem;
