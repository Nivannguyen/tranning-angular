import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: string; todo: Partial<Todo> }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);