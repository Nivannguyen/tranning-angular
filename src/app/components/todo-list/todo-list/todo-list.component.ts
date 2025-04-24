import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, CommonModule, NgClass, NgFor } from '@angular/common';
import { TodoFormComponent } from '../../todo-form/todo-form.component';
import { Todo } from '../../../store/models/todo.model';
import { AppState } from '../../../store/app.state';
import { deleteTodo, toggleTodo, updateTodo } from '../../../store/actions/todo.actions';
import { TodoEditDialogComponent } from '../../todo-edit-dialog/todo-edit-dialog.component';
import { selectAllTodos } from '../../../store/selectors/todo.selectors';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoFormComponent,
    TodoEditDialogComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    AsyncPipe,
    NgClass,
    NgFor
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.todos$ = this.store.select(selectAllTodos);
  }

  toggleTodo(id: string) {
    this.store.dispatch(toggleTodo({ id }));
  }

  deleteTodo(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }

  editTodo(todo: Todo) {
    const dialogRef = this.dialog.open(TodoEditDialogComponent, {
      width: '500px',
      data: { ...todo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateTodo({ id: todo.id, todo: result }));
      }
    });
  }
}