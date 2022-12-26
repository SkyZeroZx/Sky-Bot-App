import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const employeeRoute: Routes = [
  {
    path: '',
    data: {
      role: ['employee', 'admin'],
    },
    loadChildren: () =>
      import('../employee/status-document/status-document.module').then(
        (m) => m.StatusDocumentModule,
      ),
  },
];


@NgModule({
  imports: [RouterModule.forChild(employeeRoute)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
