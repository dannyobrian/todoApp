require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from '../src/store/configureStore'
import Routes from './routes'

const preloadedState = window.__PRELOADED_STATE__  ;//for server-side render with data
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

var onUpdate = function() {
  if( window.location.href.indexOf('#') == -1 ) {
    window.scrollTo(0, 0);
  }
};

render(
  <Provider store={store}>
    <Router onUpdate={onUpdate} history={browserHistory}>
      { Routes }
    </Router>
  </Provider>,
  rootElement
);
