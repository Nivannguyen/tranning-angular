import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { updateUser, updateUserSuccess, updateUserFailure } from '../actions/user.actions';

export const loadUsers$ = createEffect(() => {
  const actions$ = inject(Actions);
  const userService = inject(UserService);

  return actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() =>
      userService.getUsers().pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      )
    )
  );
}, { functional: true });

export const updateUser$ = createEffect(() => {
  const actions$ = inject(Actions);
  const userService = inject(UserService);

  return actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(action => {
      return userService.updateUser(action.user).pipe(
        map(user => {
          return UserActions.updateUserSuccess({ user });
        }),
        catchError(error => {
          return of(UserActions.updateUserFailure({ error }));
        })
      );
    })
  );
}, { functional: true });

export const deleteUser$ = createEffect(() => {
  const actions$ = inject(Actions);
  const userService = inject(UserService);

  return actions$.pipe(
    ofType(UserActions.deleteUser),
    mergeMap(action =>
      userService.deleteUser(action.userId).pipe(
        map(() => UserActions.deleteUserSuccess({ userId: action.userId })),
        catchError(error => of(UserActions.deleteUserFailure({ error })))
      )
    )
  );
}, { functional: true });
