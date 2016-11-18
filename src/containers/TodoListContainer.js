import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList'
const a = require('../components/TodoList/todoListActions');

const mapStateToProps = (state) => {

  return {
    viewFilter: state.todoList.viewFilter,
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
    saveAllTodos: (id,data) => {
      dispatch(a.saveAllTodos(id,data));
    },
    completeTodo: (id, viewFilter) => {
      dispatch(a.completeTodo(id,viewFilter));
    },
    viewAllTodos: (id) => {
      dispatch(a.viewAllTodos());
    },
    viewIncompleteTodos: (id) => {
      dispatch(a.viewIncompleteTodos());
    },
    setViewFilter: (status) => {
      dispatch(a.setViewFilter(status));
    },
    loadInitialState: () => {
      dispatch(a.loadInitialState());
    },
  }
};

const TodoListContainer =connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default TodoListContainer;