import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';
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

          <SubMenu key="/company" title={<span className={styles.nav_text}><Icon type="line-chart"/>分析页面</span>}>
              <Menu.Item key="/company">
                <Link to="/company">
                    <span className={styles.nav_text}>按企业维度</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/group">
                <Link to="/group">
                    <span className={styles.nav_text}>按集团维度</span>
                </Link>
              </Menu.Item>


              {/*<Menu.Item key="/details/group">
                <Link to="/details/group">
                    <span className={styles.nav_text}>集团分析</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">版本分析</Menu.Item>
              <Menu.Item key="4">跨月分析</Menu.Item>*/}
          </SubMenu>

          <SubMenu key="/settings" title={<span className={styles.nav_text}><Icon type="setting"/>设置</span>}>
              {/*<Menu.Item key="/settings">
                <Link to="/settings">
                  <span className={styles.nav_text}>选项1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">选项2</Menu.Item>
              <Menu.Item key="3">选项3</Menu.Item>
              <Menu.Item key="4">选项4</Menu.Item>*/}
          </SubMenu>
          <Menu.Item key="/testing">
            <Link to="/testing"><Icon type="code"/>
              <span className={styles.nav_text}>测试</span>
            </Link>
          </Menu.Item>
        </Menu>
      </aside>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            WPS 企业报活数据统计服务
          </h1>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            {props.children}
          </div>
        </div>
        <div className={styles.footer}>
          Ant Design 版权所有 © 2016 由金山办公软件技术部支持
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
