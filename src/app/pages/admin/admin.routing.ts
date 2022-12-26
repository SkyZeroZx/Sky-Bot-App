import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'documents',
    data: {
      role: ['admin'],
    },
    loadChildren: () =>
      import('../admin/document/document.module').then((m) => m.DocumentModule),
  },
  {
    path: 'manage-users',
    data: {
      role: ['admin'],
    },
    loadChildren: () =>
      import('../admin/manage-users/manage-users.module').then(
        (m) => m.ManageUsersModule,
      ),
  },
  {
    path: 'manage-students',
    data: {
      role: ['admin'],
    },
    loadChildren: () =>
      import('../admin/manage-students/manage-students.module').then(
        (m) => m.ManageStudentModule,
      ),
  },
];
