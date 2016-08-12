import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Menu, Breadcrumb, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './MainLayout.less';

const MainLayout = ({ children ,mylayout,dispatch}) => {

  const handleToggleSide = () => {
    dispatch({
      type: 'uioption/toggleaside',
    });
  };

  const collapseSytle = classnames({
  [styles.aside]: true,
  [styles.aside_collapse] : mylayout.collapse
});

  return (
    <div className={collapseSytle}>
      <aside className={styles.sider}>
        <div className={styles.logo}></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Icon type="user" /><span className={styles.nav_text}>导航一</span>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" /><span className={styles.nav_text}>导航二</span>
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="laptop" /><span className={styles.nav_text}>导航三</span>
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" /><span className={styles.nav_text}>导航四</span>
            </Menu.Item>
            <Menu.Item key="folder">
              <Icon type="folder" /><span className={styles.nav_text}>导航五</span>
            </Menu.Item>
          </Menu>
        <div className={styles.action} onClick={handleToggleSide.bind(this)}>
          { mylayout.collapse ? <Icon type="right"/> : <Icon type="left"/>}
        </div>
      </aside>
      <div className={styles.main}>
        <div className={styles.header}></div>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <div className={styles.footer}>
          Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({mylayout}) {
  return {
    mylayout : mylayout
  }
}

export default connect(mapStateToProps)(MainLayout);
