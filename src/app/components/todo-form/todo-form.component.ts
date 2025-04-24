import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppState } from '../../store/app.state';
import { addTodo } from '../../store/actions/todo.actions';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todoForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      const todo = {
        id: uuidv4(),
        title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        completed: false
      };
      this.store.dispatch(addTodo({ todo }));
      this.todoForm.reset();
    }
  }

  shouldShowError(controlName: string, errorCode: string): boolean {
    const control = this.todoForm.get(controlName);
    return !!control?.hasError(errorCode) && (control.touched || control.dirty || this.submitted);
  }
}