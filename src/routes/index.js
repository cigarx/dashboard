import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Overview from '../components/Overview/Overview';
import Details from '../components/Details/Details';
import Setting from '../components/Setting/Setting';
import CompanyDetails from '../components/Company/Info';
import TestingGround from '../components/Test/TestingGround';
import NotFound from '../components/NotFound';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { requireAuthentication } from '../components/Auth/AuthenticatedComponent';
import Login from '../components/Auth/Login';

const Routes = ({ history }) => {
  return (
    <Router history={history}>
      <Route name="home" breadcrumbName="home" path="/" component={MainLayout}>
        <IndexRoute component={requireAuthentication(Overview)} />
        <Route name="login" breadcrumbName="登录" path="login" component={Login} />
        <Route name="overview" breadcrumbName="概览" path="overview" component={requireAuthentication(Overview)} />
        <Route name="company" breadcrumbName="企业详情" path="company" component={requireAuthentication(Details)} />
        <Route name="detials" breadcrumbName="企业:id" path="company/:id" component={requireAuthentication(CompanyDetails)} />
        <Route name="settings" breadcrumbName="设置" path="settings" component={requireAuthentication(Setting)} />
        <Route name="testing" path="testing" component={requireAuthentication(TestingGround)} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>)
}


Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
