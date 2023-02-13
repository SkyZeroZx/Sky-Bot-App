import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ToastrModule } from 'ngx-toastr';
import { toastrConfig, auth0Config } from '@core/config';
import { SharedMaterialModule } from '@shared/material/material.module';
import { PreviewFileModule } from '../../../preview-file/preview-file.module';
import { ListAttachmentComponent } from './list-attachment.component';

fdescribe('ListAttachmentComponent', () => {
  let component: ListAttachmentComponent;
  let fixture: ComponentFixture<ListAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(toastrConfig),
        NoopAnimationsModule,
        AuthModule.forRoot(auth0Config),
        RouterTestingModule,
        SharedMaterialModule,
        SweetAlert2Module,
        NgOptimizedImage,
        ModalModule,
        PreviewFileModule,
        NgxDocViewerModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ListAttachmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
