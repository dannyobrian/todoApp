import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList'
import * as a from'../components/TodoList/todoListActions';

const mapStateToProps = (state) => {

  return {
    labels: state.todoList.labels,
    todos: state.todoList.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (data) => {
      dispatch(a.addTodo(data));
    },
    deleteTodo: (id) => {
      dispatch(a.deleteTodo(id));
    },
    promoteTodo: (id) => {
      dispatch(a.promoteTodo(id));
    },
    demoteTodo: (id) => {
      dispatch(a.demoteTodo(id));
    },
    editTodo: (id) => {
      dispatch(a.editTodo(id));
    },
    saveTodo: (id,data) => {
      dispatch(a.saveTodo(id,data));
    },
    completeTodo: (id) => {
      dispatch(a.completeTodo(id));
    },
    viewAllTodos: (id) => {
      dispatch(a.viewAllTodos());
    },
    viewIncompleteTodos: (id) => {
      dispatch(a.viewIncompleteTodos());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);