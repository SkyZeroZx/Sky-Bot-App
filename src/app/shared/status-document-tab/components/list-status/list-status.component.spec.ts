import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { toastrConfig, auth0Config } from '@core/config';
import { StatusService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { PreviewFileModule } from '../../../preview-file/preview-file.module';
import { ListStatusComponent } from './list-status.component';
import { CommonMock } from '../../../../core/mocks/common.mock.spec';
import { StatusDocument } from '../../../../core/interfaces';
import { of } from 'rxjs';

fdescribe('ListStatusComponent', () => {
  let component: ListStatusComponent;
  let statusService: StatusService;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<ListStatusComponent>;
  const statusDocument: StatusDocument = CommonMock.statusDocument;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
      declarations: [ListStatusComponent],
      providers: [StatusService, { provide: ToastrService, useClass: ToastrService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusService = TestBed.inject(StatusService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(ListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate updateStatus', () => {
    component.updateStatus(statusDocument);
    expect(component.statusDocumentSelected).toEqual(statusDocument);
    expect(component.showUpdateStatus).toBeTruthy();
  });

  it('validate onUpdate', () => {
    const spyEmitUpdate = spyOn(component.update, 'emit');
    component.onUpdate();
    expect(component.showUpdateStatus).toBeFalsy();
    expect(spyEmitUpdate).toHaveBeenCalled();
  });

  it('validate deleteStatus Ok', () => {
    const spyEmitUpdate = spyOn(component.update, 'emit');
    const spyStatusDelete = spyOn(statusService, 'deleteStatus').and.returnValue(
      of(null),
    );
    const spyToastSucess = spyOn(toastrService, 'success');
    component.deleteStatus(statusDocument);
    expect(spyEmitUpdate).toHaveBeenCalled();
    expect(spyStatusDelete).toHaveBeenCalled();
    expect(spyToastSucess).toHaveBeenCalled();
  });
});
