import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { addTodo, updateTodo, deleteTodo, toggleTodo } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo]
  })),
  on(updateTodo, (state, { id, todo }) => ({
    ...state,
    todos: state.todos.map(item =>
      item.id === id ? { ...item, ...todo } : item
    )
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);