import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}