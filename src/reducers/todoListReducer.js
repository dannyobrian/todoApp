import uuid from 'uuid';
// var used instead of import for older ie compatibility
var a = require('../components/TodoList/todoListActions');


const todoList = (state, action) => {

  // define default state
  if (!state) {
    state = {
      viewFilter: "VIEW_INCOMPLETE",
      labels: {
        done: "Mark as done",
        undo: "Mark as undone",
        save: "Save changes",
        cancel: "Cancel"
      },
      todos: []
    }
  }

  switch (action.type) {
    case a.SET_VIEW_FILTER:
      return Object.assign({}, state, { viewFilter: action.status});
      break;
    case a.SET_INITIAL_STATE:
      return Object.assign({}, state, { todos: action.data});
      break;
    case a.DELETE_TODO:
    case a.PROMOTE_TODO:
    case a.DEMOTE_TODO:
    case a.ADD_TODO:
    case a.SAVE_TODO:
    case a.COMPLETE_TODO:
    case a.EDIT_TODO:
    case a.VIEW_INCOMPLETE:
    case a.VIEW_ALL:
      // hand off to sub reducer to handle the array of nested objects
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      });
      break;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  let i;
  switch (action.type) {
    case a.SET_INITIAL_STATE:
      return action.data;
      break;
    case a.ADD_TODO:
        return [
          {
            id: uuid.v4(),
            complete: false,
            edit: true,
            visible: true,
            title: "",
            text: ""
          },
          ...state
        ];
      break;
    case a.SAVE_TODO:
        return state.map((todo) => {
          if(todo.id == action.id) {
            return Object.assign({}, todo, {
              title: action.data.title,
              text: action.data.text,
              edit: false
            })
          }
          return todo
        });
      break;
    case a.COMPLETE_TODO:
      return state.map((todo) => {
        if(todo.id == action.id) {
          return Object.assign({}, todo, {
            complete: !todo.complete,
            visible: (action.viewFilter == 'VIEW_ALL')
          })
        }
        return todo
      });
      break;
    case a.DELETE_TODO:
      return state.filter((todo) => {
        if(todo.id != action.id) {
          return todo
        }
      });
      break;
    case a.PROMOTE_TODO:
      let p;
      state.forEach((todo, index) => {
        if (todo.id == action.id) { p = index }
      });
      let pCopy = state.slice(0);
      if (p>0){
        let pTarget = pCopy.slice(p-1,p)[0];
        pCopy[p-1] = pCopy.slice(p, p + 1)[0];
        pCopy[p] = pTarget;
      }
      return pCopy;
      break;
    case a.DEMOTE_TODO:
      let d;
      state.forEach((todo, index) => {
        if (todo.id == action.id) { d = index }
      });

      let dCopy = state.slice(0);
      if ((d+1)<state.length){
        let dTarget = dCopy.slice(d+1,d+2)[0];
        dCopy[d+1] = dCopy.slice(d, d + 1)[0];
        dCopy[d] = dTarget;
      }
      return dCopy;
      break;
    case a.VIEW_INCOMPLETE:
      return state.map((todo) => {
        return Object.assign({}, todo, {
          visible: !todo.complete
        });
      });
      break;
    case a.VIEW_ALL:
        return state.map((todo) => {
          return Object.assign({}, todo, {
            visible: true
          });
        });
      break;
    case a.EDIT_TODO:
      return state.map((todo) => {
        if(todo.id == action.id) {
          return Object.assign({}, todo, {
            edit: !todo.edit
          })
        }
        return todo
      });
    default:
      return state;
  }
};

export default todoList;