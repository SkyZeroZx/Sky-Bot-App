import { Routes } from '@angular/router';
import { IsLogged } from '@core/guards';
import { LoginComponent } from '../../pages/auth/login/login.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLogged],
    data: { animation: 'login' },
  },
];
