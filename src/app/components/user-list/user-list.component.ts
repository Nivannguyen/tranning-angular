import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, updateUser, deleteUser } from '../../store/actions/user.actions';
import { selectUsers, selectLoading } from '../../store/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { DisplayUserDataPipe } from '../../pipes/DisplayUserDataPipe.pipe';
import { UserEditDialogComponent } from '../edit-user-dialog/user-edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AsyncPipe,
    DisplayUserDataPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);
  displayedColumns: string[] = ['avatar', 'fullname', 'email', 'age', 'gender', 'createdAt', 'updatedAt', 'action'];

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '500px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'save') {
        this.store.dispatch(updateUser({ user: result.user }));
      } else if (result?.action === 'cancel') {
        console.log('Edit dialog was canceled');
      }
    });
  }

  openDeleteConfirmDialog(user: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete ${user.firstname} ${user.lastname}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.dispatch(deleteUser({ userId: user.id }));
      } else {
        console.log('Delete action was canceled');
      }
    });
  }
}