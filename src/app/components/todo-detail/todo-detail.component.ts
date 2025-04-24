import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { Todo } from '../../store/models/todo.model';
import { AppState } from '../../store/app.state';
import { selectTodoById } from '../../store/selectors/todo.selectors';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo | undefined>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.todo$ = this.store.select(selectTodoById(id));
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/']);
  }
}