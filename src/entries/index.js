
import './index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware, push } from 'react-router-redux';
import reducers from '../reducers/index';
import SagaManager from '../sagas/SagaManager';
import './index.less';

//////////////////////
// Store

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const reduxrouterMW = routerMiddleware(browserHistory);
const enhancer = compose(
  applyMiddleware(sagaMiddleware, reduxrouterMW),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


const store = createStore(combineReducers({
  ...reducers, routing,
}), initialState, enhancer);

SagaManager.startSagas(sagaMiddleware);

if (module.hot) {
  /*eslint-disable */
  module.hot.accept('../reducers', () => {
    const reducers = require('../reducers');
    const combinedReducers = combineReducers({ ...reducers, routing });
    store.replaceReducer(combinedReducers);
  });
  module.hot.accept('../sagas/SagaManager', () => {
    SagaManager.cancelSagas(store);
    require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
  });
  /*eslint-enable */
}


//////////////////////
// Render

const history = syncHistoryWithStore(browserHistory, store);

let render = () => {
  /*eslint global-require: "off"*/
  const Routes = require('../routes/index');
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  , document.getElementById('root'));
};

if (module.hot) {
  const renderNormally = render;
    /*eslint-disable */
  const renderException = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      renderException(error);
    }
  };
  module.hot.accept('../routes/index', () => {
    render();
  });
  /*eslint-enable */
}

render();
