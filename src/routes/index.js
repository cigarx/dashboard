import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import Overview from '../components/Overview/Overview';
import Details from '../components/Details/Details';
import Setting from '../components/Setting/Setting';
import CompanyDetails from '../components/Company/Info';
import TestingGround from '../components/Test/TestingGround';
import NotFound from '../components/NotFound';
import MainLayout from '../layouts/MainLayout/MainLayout';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route name="home" breadcrumbName="概览" path="/" component={MainLayout}>
      <IndexRoute component={Overview} />
      <Route name="company" breadcrumbName="企业详情" path="company" component={Details} />
      <Route name="detials" breadcrumbName="企业:id" path="company/:id" component={CompanyDetails} />
      <Route name="settings" breadcrumbName="设置" path="settings" component={Setting} />
      <Route name="testing" path="testing" component={TestingGround} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
