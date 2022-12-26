import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStudentComponent } from '../manage-students/manage-students.component';

export const manageStudentsRoutes: Routes = [
  {
    path: '',
    component: ManageStudentComponent,
    data: { animation: 'manage-students' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageStudentsRoutes)],
  exports: [RouterModule],
})
export class ManageStudentsRoutingModule {}
