import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthGuard as RoleGuard } from '@core/guards';
import {
  PublicLayoutComponent,
  AuthLayoutComponent,
  LoadingLayoutComponent,
} from './layouts';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/pages/public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule,
          ),
      },
    ],
  },
  {
    path: 'loading',
    canActivate: [AuthGuard],
    component: LoadingLayoutComponent,
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivateChild: [RoleGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('../app/pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'common',
        loadChildren: () =>
          import('../app/pages/common/commons.module').then((m) => m.CommonsModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../app/pages/employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../app/pages/student/student.module').then((m) => m.StudentModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'loading',
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
