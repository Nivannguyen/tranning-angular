import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TodoListComponent } from './components/todo-list/todo-list/todo-list.component';
import { todoReducer } from './store/reducers/todo.reducer';
const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideStore({ todos: todoReducer }),
  ],
};
