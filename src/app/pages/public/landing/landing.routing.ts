import { Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';

export const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: { animation: 'landing' },
  },
];
