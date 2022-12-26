import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StatusDocumentTabComponent } from './status-document-tab.component';
import { SharedMaterialModule } from '../material/material.module';
import {
  ListAttachmentComponent,
  ListCertificateComponent,
  ListStatusComponent,
  UpdateStatusComponent,
} from './components';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    SweetAlert2Module,
    NgOptimizedImage,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    StatusDocumentTabComponent,
    ListCertificateComponent,
    ListAttachmentComponent,
    ListStatusComponent,
    UpdateStatusComponent,
  ],
  exports: [StatusDocumentTabComponent],
})
export class StatusDocumentTabModule {}
