import React, { Component } from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

// Views
import App from '../src/components/App'
import Home from '../src/routes/Home';
import FourOhFour from '../src/routes/404/index';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/*" components={FourOhFour} />
  </Route>
);

export default Routes;
