import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';
import { AppState } from '../app.state';

export const selectTodoState = createFeatureSelector<AppState, TodoState>(
  'todos'
);

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodoById = (id: string) =>
  createSelector(selectTodoState, (state: TodoState) =>
    state.todos.find((todo) => todo.id === id)
);
