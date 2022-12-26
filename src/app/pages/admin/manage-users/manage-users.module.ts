import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PhonePipe } from '@core/pipes';
import { SharedMaterialModule } from '@shared/material/material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CUSTOM_PAGINATOR_LABEL } from '@core/config';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageUsersRoutingModule } from '../manage-users/manage-users.routing';
import { CreateUserComponent, UpdateUserComponent } from './components';

@NgModule({
  declarations: [ManageUsersComponent, CreateUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ModalModule,
    PhonePipe,
    ManageUsersRoutingModule,
  ],
  providers: [
    DatePipe,
    { provide: MatPaginatorIntl, useValue: CUSTOM_PAGINATOR_LABEL() },
  ],
})
export class ManageUsersModule {}
