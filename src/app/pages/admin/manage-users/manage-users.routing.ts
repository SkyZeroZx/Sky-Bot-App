import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from '../manage-users/manage-users.component';

export const manageUsersRouter: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    data: { animation: 'manage-users' },
  },
];


@NgModule({
  imports: [RouterModule.forChild(manageUsersRouter)],
  exports: [RouterModule],
})
export class ManageUsersRoutingModule {}