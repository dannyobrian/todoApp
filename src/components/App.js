require('core-js');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
          { this.props.children }
      </div>
    )  
  }
}
