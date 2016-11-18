require('isomorphic-fetch');
require('es6-promise').polyfill();

export const ADD_TODO = 'ADD_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const SAVE_ALL_TODOS = 'SAVE_ALL_TODOS';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const PROMOTE_TODO = 'PROMOTE_TODO';
export const DEMOTE_TODO = 'DEMOTE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const VIEW_INCOMPLETE = 'VIEW_INCOMPLETE';
export const VIEW_ALL = 'VIEW_ALL';
export const SET_VIEW_FILTER = 'SET_VIEW_FILTER';
export const LOAD_INITIAL_STATE = 'LOAD_INITIAL_STATE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

let domain = 'localhost';
if(typeof window !== 'undefined') {
  domain = document.domain;
}


export function performSaveTodo(id, data) {
  return {type: SAVE_TODO, id: id, data: data}
}

export function saveTodo(id, data) {
  return(dispatch) => {
    dispatch(performSaveTodo(id,data));
    dispatch(saveAllTodos());
  }
}

export function saveAllTodos() {
  return (dispatch, getState) => {
    let state = getState();
    let url = "http://"+domain+":5000/api/save";
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: state.todoList.todos })
    })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res);
          return HTTPError(res);
        }
      })
      .then((res) => {
        return Promise.resolve(res);
      }).catch((err) => {
        console.log(err);
        return Promise.reject(err.message);
    });
  }
}

function HTTPError(obj) {
  return Promise.reject({
    success: obj.ok,
    status: obj.status,
    message: obj.statusText
  });
}

export function addTodo(status=true) {
  return {type: ADD_TODO, status: status}
}

export function editTodo(id) {
  return {type: EDIT_TODO, id: id}
}

export function deleteTodo(id) {
  return(dispatch) => {
    dispatch(performDeleteTodo(id));
    dispatch(saveAllTodos());
  }
}

export function performDeleteTodo(id) {
  return {type: DELETE_TODO, id:id}
}

export function promoteTodo(id) {
  return {type: PROMOTE_TODO, id:id}
}

export function demoteTodo(id) {
  return {type: DEMOTE_TODO, id:id}
}

export function completeTodo(id, viewFilter) {
  return {type: COMPLETE_TODO, id:id, viewFilter:viewFilter}
}

export function viewIncompleteTodos(status=true) {
  return {type: VIEW_INCOMPLETE, status: status}
}

export function viewAllTodos(status=true) {
  return {type: VIEW_ALL, status: status}
}

export function setViewFilter(s) {
  return {type: SET_VIEW_FILTER, status: s}
}

export function setInitialState(data) {
  return {type: SET_INITIAL_STATE, data: data}
}

export function loadInitialState(s) {
  return(dispatch) => {
    let url = "http://"+domain+":5000/api/data";
    fetch(url)
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res);
          return HTTPError(res);
        }
      })
      .then((res) => {
        dispatch(setInitialState(res.data));
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log('error:'+err.message);
        return Promise.reject(err.message);
      })
  };
}


