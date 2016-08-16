import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import Overview from '../components/Overview/Overview';
import Details from '../components/Details/Details';
import Setting from '../components/Setting/Setting';
import NotFound from '../components/NotFound';
import MainLayout from '../layouts/MainLayout/MainLayout';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route name="home" breadcrumbName="概览" path="/" component={MainLayout}>
      <IndexRoute component={Overview} />
      <Route name="details" breadcrumbName="详情" path="details" component={Details} />
      <Route name="settings" breadcrumbName="设置" path="settings" component={Setting} />
      <Route name="completeds" breadcrumbName="已完成" path="completed"  component={App}>
            <Route name="completed" breadcrumbName="已完成:id" path=":id" />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
