import React, {Component} from 'react'

import Header from '../../components/Header';
import TodoListContainer from '../../containers/TodoListContainer';

export default class Home extends Component {
  componentDidMount() {
    document.title = 'Todo list';
  }
  render() {
    return (
      <div className="HomePage">
        <div className="HomePage-content">
          <Header/>
          <TodoListContainer />
        </div>
      </div>
    )
  }
}


