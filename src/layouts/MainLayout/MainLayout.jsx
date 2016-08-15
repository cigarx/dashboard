import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Menu, Breadcrumb, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './MainLayout.less';

const MainLayout = (props) => {
  const {children, mylayout, dispatch, location} = props;
  const handleToggleSide = () => {
    dispatch({type: 'uioption/toggleaside'});
  };

  const collapseSytle = classnames({
    [styles.aside]: true,
    [styles.aside_collapse]: mylayout.collapse
  });

  const _linkRender = (href, name, paths) => {
    return <Link to={href}>{name.props.children}</Link>
  }

  const _loctionPath = location.pathname;
  console.log([_loctionPath]);

  componentWillReceiveProps : (next)=>{
    console.log("next:" , next);
  };

  componentWillMount : (state)=>{
    console.log("state:" , state);
  }

  return (
    <div className={collapseSytle}>
      <aside className={styles.sider}>
        <div className={styles.logo}></div>
        <Menu mode="inline" theme="dark" selectedKeys={[_loctionPath]}>
          <Menu.Item key="/">
            <Link to="/"><Icon type="laptop"/>
              <span className={styles.nav_text}>概览</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/actived">
            <Link to="/actived"><Icon type="line-chart"/>
              <span className={styles.nav_text}>分析</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/completed">
            <Link to="/completed"><Icon type="notification"/>
              <span className={styles.nav_text}>通知</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Link to="/completed/3"><Icon type="setting"/>
              <span className={styles.nav_text}>设置</span>
            </Link>
          </Menu.Item>
        </Menu>
        <div className={styles.action} onClick={handleToggleSide.bind(this)}>
          {mylayout.collapse
            ? <Icon type="right"/>
            : <Icon type="left"/>}
        </div>
      </aside>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            wps内网统计服务器
          </h1>
        </div>
        <div className={styles.breadcrumb}>
          <Breadcrumb {...props} linkRender={_linkRender.bind(this)}/>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            {props.children}
          </div>
        </div>
        <div className={styles.footer}>
          Ant Design 版权所有 © 2015 由金山办公软件技术部支持
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired
};

function mapStateToProps({mylayout}) {
  return {mylayout: mylayout}
}

export default connect(mapStateToProps)(MainLayout);
