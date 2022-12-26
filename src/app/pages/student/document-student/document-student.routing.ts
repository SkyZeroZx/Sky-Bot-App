import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentStudentDetailComponent } from './components/document-student-detail/document-student-detail.component';
import { DocumentStudentComponent } from './document-student.component';

export const documentStudentRoute: Routes = [
  {
    path: 'student-document/:id',
    component: DocumentStudentDetailComponent,
    data: { animation: 'document-student-detail' },
  },
  {
    path: 'student-document',
    component: DocumentStudentComponent,
    data: { animation: 'document-student' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentStudentRoute)],
  exports: [RouterModule],
})
export class DocumentStudentRoutingModule {}
