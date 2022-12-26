import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedMaterialModule } from '@shared/material/material.module';
import { CUSTOM_PAGINATOR_LABEL } from '@core/config';
import { DocumentRoutingModule } from '../document/document.routing';
import { DocumentComponent } from '../document/document.component';
import { CreateDocumentComponent, UpdateDocumentComponent } from '../document/components';

@NgModule({
  declarations: [DocumentComponent, CreateDocumentComponent, UpdateDocumentComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ModalModule,
    DocumentRoutingModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CUSTOM_PAGINATOR_LABEL() }],
})
export class DocumentModule {}
