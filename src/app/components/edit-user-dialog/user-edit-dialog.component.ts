import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HighlightInvalidDirective } from '../../directives/highlight-invalid.directive';
// Nếu có custom directive highlightInvalid, import vào đây

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  templateUrl: './user-edit-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HighlightInvalidDirective
  ]
})
export class UserEditDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const user = data.user || {};
    this.userForm = this.fb.group({
      firstname: [user.firstname || '', [Validators.required, Validators.minLength(2)]],
      lastname: [user.lastname || '', [Validators.required, Validators.minLength(2)]],
      email: [user.email || '', [Validators.required, Validators.email]],
      age: [user.age || '', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: [user.gender || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Pass structured data with an action type
      this.dialogRef.close({ action: 'save', user: { ...this.data.user, ...this.userForm.value } });
    }
  }

  onCancel() {
    // Pass structured data with an action type
    this.dialogRef.close({ action: 'cancel' });
  }
}