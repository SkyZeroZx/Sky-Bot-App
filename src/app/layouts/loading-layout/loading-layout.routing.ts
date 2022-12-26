import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoadingLayoutComponent } from '../loading-layout/loading-layout.component';

export const LoadingLayoutRoutes: Routes = [
  {
    path: '',
    component: LoadingLayoutComponent,
    canActivateChild: [AuthGuard],
    data: { animation: 'loading' },
  },
];
