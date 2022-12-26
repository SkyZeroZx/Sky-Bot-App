import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const commonsRoutes: Routes = [
  {
    path: 'user-profile',
    data: {
      role: ['admin', 'employee', 'student'],
    },
    loadChildren: () =>
      import('../common/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule,
      ),
  },
  {
    path: 'dashboard',
    data: {
      role: ['admin', 'employee'],
    },
    loadChildren: () =>
      import('../common/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(commonsRoutes)],
  exports: [RouterModule],
})
export class CommonsRoutingModule {}
