import React, {Component} from 'react'

import Header from '../../components/Header';

export default class Home extends Component {
  componentDidMount() {
    document.title = 'Todo list';
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="HomePage">
        </div>
      </div>
    )
  }
}


