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
