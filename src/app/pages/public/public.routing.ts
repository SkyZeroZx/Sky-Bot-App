import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
  },
];
