export const ADD_TODO = 'ADD_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const VIEW_INCOMPLETE = 'VIEW_INCOMPLETE';
export const VIEW_ALL = 'VIEW_ALL';

export function saveTodo(id) {
  return {type: SAVE_TODO, id: id}
}

export function addTodo(status=true) {
  return {type: ADD_TODO, status: status}
}

export function editTodo(id) {
  return {type: EDIT_TODO, id: id}
}

export function deleteTodo(id) {
  return {type: DELETE_TODO, id:id}
}

export function completeTodo(id) {
  return {type: COMPLETE_TODO, id:id}
}

export function viewIncompleteTodos(status=true) {
  return {type: VIEW_INCOMPLETE, status: status}
}

export function viewAllTodos(status=true) {
  return {type: VIEW_ALL, status: status}
}


