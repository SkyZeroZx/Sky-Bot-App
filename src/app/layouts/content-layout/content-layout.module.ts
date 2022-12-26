import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [CommonModule, NgbModule, SweetAlert2Module.forRoot()],
  providers: [DatePipe]
})
export class ContentLayoutModule {}
