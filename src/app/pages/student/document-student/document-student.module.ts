import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentStudentComponent } from './document-student.component';
import { DocumentStudentRoutingModule } from './document-student.routing';
import { DocumentStudentDetailComponent } from './components/document-student-detail/document-student-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@shared/material/material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CUSTOM_PAGINATOR_LABEL } from '@core/config';
import { StatusDocumentTabModule } from '../../../shared/status-document-tab/status-document.module';

@NgModule({
  declarations: [DocumentStudentComponent, DocumentStudentDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    DocumentStudentRoutingModule,
    StatusDocumentTabModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CUSTOM_PAGINATOR_LABEL() }],
})
export class DocumentStudentModule {}
