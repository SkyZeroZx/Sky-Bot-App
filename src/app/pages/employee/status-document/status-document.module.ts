import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedMaterialModule } from '@shared/material/material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { StatusDocumentComponent } from '../status-document/status-document.component';
import { StatusDocumentDetailComponent } from '../status-document/components/status-document-detail/status-document-detail.component';
import { StatusDocumentRoutingModule } from '../status-document/status-document.routing';
import {
  CreateStatusComponent,
  CreateCertificateComponent,
} from './components/status-document-detail/components';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { CUSTOM_PAGINATOR_LABEL } from '@core/config';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    StatusDocumentComponent,
    StatusDocumentDetailComponent,
    CreateStatusComponent,
    CreateCertificateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxDocViewerModule,
    ModalModule,
    StatusDocumentRoutingModule,
    StatusDocumentTabModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CUSTOM_PAGINATOR_LABEL() }],
})
export class StatusDocumentModule {}
