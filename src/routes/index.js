import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import MainLayout from '../layouts/MainLayout/MainLayout';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route name="home" breadcrumbName="首页" path="/" component={MainLayout}>
      <IndexRoute component={App} />
      <Route name="actived" breadcrumbName="激活" path="actived" component={App} />
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
