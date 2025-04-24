import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../store/models/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.scss']
})
export class TodoEditDialogComponent {
  editForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {
    this.editForm = this.fb.group({
      title: [data.title, [Validators.required, Validators.minLength(3)]],
      description: [data.description, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  shouldShowError(controlName: string, errorCode: string): boolean {
    const control = this.editForm.get(controlName);
    return !!control?.hasError(errorCode) && (control.touched || control.dirty || this.submitted);
  }

  onCancel() {
    this.dialogRef.close();
  }
}