import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/actions/user.actions';
import { selectUsers, selectLoading } from '../../store/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { DisplayUserDataPipe } from '../../pipes/DisplayUserDataPipe.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, AsyncPipe, DisplayUserDataPipe],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private store = inject(Store);
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);
  displayedColumns: string[] = ['avatar', 'fullname', 'email', 'age', 'gender', 'createdAt', 'updatedAt', 'action'];
  
  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}
