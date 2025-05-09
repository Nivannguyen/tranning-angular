import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { userReducer } from './store/reducers/user.reducer';
import { AppComponent } from './app.component';
import { provideEffects } from '@ngrx/effects';
import { loadUsers$ } from './store/effects/user.effects';
import { UserListComponent } from './components/user-list/user-list.component';
import { provideHttpClient } from '@angular/common/http';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideStore({ users: userReducer }),
    provideEffects({ loadUsers$: loadUsers$ }),
    provideHttpClient()
  ],
};
