import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const studentRoute: Routes = [
  {
    path: '',
    data: {
      role: ['admin', 'employee', 'student'],
    },
    loadChildren: () =>
      import('../student/document-student/document-student.module').then(
        (m) => m.DocumentStudentModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoute)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
