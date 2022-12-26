import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CUSTOM_PAGINATOR_LABEL } from '@core/config';
import { SharedMaterialModule } from '@shared/material/material.module';
import { ManageStudentsRoutingModule } from '../manage-students/manage-students.routing';
import { ManageStudentComponent } from '../manage-students/manage-students.component';
import { CreateStudentComponent } from '../manage-students/components/create-student/create-student.component';
import { UpdateStudentComponent } from '../manage-students/components/update-student/update-student.component';

@NgModule({
  declarations: [ManageStudentComponent, CreateStudentComponent, UpdateStudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ModalModule,
    ManageStudentsRoutingModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CUSTOM_PAGINATOR_LABEL() }],
})
export class ManageStudentModule {}
