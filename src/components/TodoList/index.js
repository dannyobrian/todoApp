import React, {Component,Proptypes} from 'react';
import uuid from 'uuid';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TodoList">
        <TodoItem id={uuid.v4()}/>
      </div>
    )
  }
}

const TodoItem = ({id, title, text}) => {
	return (
	  <div ref={id} className="Todo">
      <div className="Todo-title">{title}</div>
      <div className="Todo-text">{text}</div>
    </div>
  )
};
TodoItem.proptypes = {
  id: Proptypes.string.isRequired
};