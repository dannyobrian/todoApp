import React, {Component,PropTypes} from 'react';

export default class TodoList extends Component {

  constructor(props) {
    super(props);
    this.editTodo = this.props.editTodo.bind(this);
    this.addTodo = this.props.addTodo.bind(this);
    this.deleteTodo = this.props.deleteTodo.bind(this);
    this.completeTodo = this.props.completeTodo.bind(this);
    this.viewAllTodos = this.props.viewAllTodos.bind(this);
    this.viewIncompleteTodos = this.props.viewIncompleteTodos.bind(this);
    this.setViewFilter = this.props.setViewFilter.bind(this);
    this.loadInitialState = this.props.loadInitialState.bind(this);
  }

  setVisible(filter) {
    this.setViewFilter(filter);
    switch(filter) {
      case 'VIEW_ALL':
        this.viewAllTodos(filter);
        break;
      case 'VIEW_INCOMPLETE':
        this.viewIncompleteTodos(filter);
        break;
    }
  };

  componentWillMount() {
    this.loadInitialState();
  }

  render () {
    return (
      <div className="TodoList">
        <div className="TodoList-toolbar">
          <div className="TodoList-viewButtonLabel" aria-label="Change todo display:">Display:</div>
          <button className={`TodoList-allButton btn btn-default ${this.props.viewFilter == 'VIEW_ALL' ? 'btn-is-active' : ''}`}
                  type="button"
                  tabIndex="1"
                  aria-label="View all todos"
                  aria-pressed={`${this.props.viewFilter == 'VIEW_ALL'}`}
                  onClick={() => this.setVisible('VIEW_ALL')}>
            <span aria-hidden="true">All</span>
          </button>
          <button className={`TodoList-incompleteButton btn btn-default ${this.props.viewFilter == 'VIEW_INCOMPLETE' ? 'btn-is-active' : ''}`}
                  type="button"
                  tabIndex="2"
                  aria-label="View incomplete todos"
                  aria-pressed={`${this.props.viewFilter == 'VIEW_INCOMPLETE'}`}
                  onClick={() => this.setVisible('VIEW_INCOMPLETE')}>
            <span aria-hidden="true">Incomplete</span>
          </button>
          <button className="TodoList-addButton btn btn-default glyphicon glyphicon-plus"
                  type="button"
                  tabIndex="3"
                  aria-label="add new todo"
                  onClick={this.addTodo}>
            <span aria-hidden="true" className="hidden">Done</span>
          </button>
        </div>
        {
          this.props.todos.map((item) => {
            return <TodoItem key={item.id}
                             editTodo={this.editTodo}
                             deleteTodo={this.deleteTodo}
                             completeTodo={this.completeTodo}
                             {...this.props}
                             {...item}/>
          })
        }
      </div>
    )
  }
}

export const TodoItem = ({edit,visible,complete, ...rest}) => {

  let content = edit ? <TodoItemBodyEdit complete={complete} {...rest}/> : <TodoItemBody complete={complete} {...rest}/>;

  return (
	  <div className={`Todo ${visible ? '' : 'hidden'} ${complete ? 'completed' : ''}`} aria-hidden={`${!visible}`}>
      {content}
    </div>
  )
};
TodoItem.propTypes = {
  visible: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
};


export const TodoItemBody = ({id,title,text,labels,complete,editTodo,deleteTodo,completeTodo,promoteTodo,demoteTodo,viewFilter}) => {
  return (
    <div className="panel panel-default">
      <div className="Todo-headerBar panel-heading clearfix">
        <button onClick={() => deleteTodo(id)}
                type="button"
                className="close"
                aria-label="Delete todo">
          <span aria-hidden="true">&times;</span>
        </button>
        <h2 className="Todo-title pull-left">{title}</h2>
      </div>
      <div className="panel-body">
        <div className="Todo-text">{text}</div>
        <div className="Todo-editButtonContainer">
          <button className="Todo-promoteButton btn btn-default btn-sm glyphicon glyphicon-arrow-up"
                  type="button"
                  aria-label="Promote todo"
                  onClick={() => promoteTodo(id)}>
            <span aria-hidden="true" className="hidden">promote</span>
          </button>
          <button className="Todo-demoteButton btn btn-default btn-sm glyphicon glyphicon-arrow-down"
                  type="button"
                  aria-label="Demote todo"
                  onClick={() => demoteTodo(id)}>
            <span aria-hidden="true" className="hidden">demote</span>
          </button>
          <button className="Todo-editButton btn btn-default btn-sm glyphicon glyphicon-pencil"
                  type="button"
                  aria-label="Edit todo"
                  onClick={() => editTodo(id)}>
            <span aria-hidden="true" className="hidden">Edit</span>
          </button>
          <button className={`Todo-completeButton btn btn-default btn-sm  glyphicon ${!!complete ? 'glyphicon-remove' : 'glyphicon-ok'}`}
                  type="button"
                  aria-label={`${!!complete ? labels.undo : labels.done}`}
                  onClick={() => completeTodo(id, viewFilter)}>
            <span aria-hidden="true" className="hidden">{!!complete ? labels.undo : labels.done}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
TodoItemBody.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  complete: PropTypes.bool.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};


class TodoItemBodyEdit extends Component {
  constructor(props){
    super(props);
    this.content = {title:this.props.title, text: this.props.text};
    this.id = this.props.id;
    this.saveTodo = this.props.saveTodo.bind(this);
    this.editTodo = this.props.editTodo.bind(this);
    this.deleteTodo = this.props.deleteTodo.bind(this);
  }

  // save current changes
  saveChanges = (e) => { this.saveTodo(this.props.id, this.content) };

  // toggle edit state
  cancelChanges = (e) => { this.editTodo(this.props.id) };

  // update text value
  updateText = (e) => { this.content.text = e.target.value };

  // update title value
  updateTitle = (e) => { this.content.title = e.target.value };

  render (){
    return(
      <div className="panel panel-default">
        <div className="Todo-headerBar panel-heading clearfix">
          <button onClick={() => this.deleteTodo(this.id)}
                  type="button"
                  className="close"
                  aria-label="Delete todo">
            <span aria-hidden="true">&times;</span>
          </button>
          <label htmlFor="titleEdit">Title:&nbsp;</label>
          <input id="titleEdit"
                 onChange={this.updateTitle}
                 type="text"
                 className="form-input"
                 defaultValue={this.props.title}/>
        </div>
        <div className="panel-body">
          <label className="Todo-textEditLabel" htmlFor="textEdit">Text:&nbsp;</label>
          <textarea id="textEdit"
                    onChange={this.updateText}
                    className="Todo-textarea"
                    defaultValue={this.props.text}></textarea>
          <div className="Todo-editButtonContainer">
            <button className="Todo-cancelButton btn btn-default btn-sm  btn-danger"
                    type="button"
                    aria-label="Cancel"
                    onClick={this.cancelChanges}>
              <span aria-hidden="true">{this.props.labels.cancel}</span>
            </button>
            <button className="Todo-saveButton btn btn-default btn-sm btn-success"
                    type="button"
                    aria-label="Save todo"
                    onClick={this.saveChanges}>
              <span aria-hidden="true">{this.props.labels.save}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
TodoItemBodyEdit.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  complete: PropTypes.bool.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
