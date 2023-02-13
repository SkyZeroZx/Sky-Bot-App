import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewFileComponent } from './preview-file.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [PreviewFileComponent],
  imports: [CommonModule, NgxDocViewerModule, SweetAlert2Module],
  exports: [PreviewFileComponent],
})
export class PreviewFileModule {}
