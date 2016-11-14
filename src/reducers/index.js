import { combineReducers } from 'redux'
import global from './globalReducer'
import todoList from './todoListReducer'

const rootReducer = combineReducers({
  global,
  todoList,
});

export default rootReducer
