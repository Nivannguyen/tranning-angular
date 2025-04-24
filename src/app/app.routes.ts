import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list/todo-list.component';

export const appRoutes: Routes = [
  { path: '', component: TodoListComponent },
  { path: '**', redirectTo: '' }
];