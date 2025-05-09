import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user.service';

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
