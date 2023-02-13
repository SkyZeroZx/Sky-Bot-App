import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { toastrConfig, auth0Config } from '@core/config';
import { SharedMaterialModule } from '@shared/material/material.module';
import { PreviewFileModule } from '../../../../preview-file/preview-file.module';

import { UpdateStatusComponent } from './update-status.component';
import { StatusService } from '@core/services';
import { CommonMock } from '@core/mocks/common.mock.spec';
import { of } from 'rxjs';

fdescribe('UpdateStatusComponent', () => {
  let component: UpdateStatusComponent;
  let statusService: StatusService;
  let toastrService: ToastrService;

  let fixture: ComponentFixture<UpdateStatusComponent>;

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
      declarations: [UpdateStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusService = TestBed.inject(StatusService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(UpdateStatusComponent);
    component = fixture.componentInstance;

    component.statusDocument = CommonMock.statusDocument;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateForm = spyOn(component, 'createFormUpdateStatus');
    component.ngOnInit();
    expect(spyCreateForm).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spySwal = spyOn(component.modalUpdateStatus, 'show');
    component.ngAfterViewInit();
    expect(spySwal).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyCloseEmit = spyOn(component.close, 'emit');
    const spyUpdateStatusFormFormReset = spyOn(component.updateStatusForm, 'reset');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyUpdateStatusFormFormReset).toHaveBeenCalled();
  });

  it('validate updateStatus', () => {
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyUpdateStatusFormFormReset = spyOn(component.updateStatusForm, 'reset');
    const spyStatusUpdate = spyOn(statusService, 'updateStatus').and.returnValue(
      of(null),
    );
    component.updateStatus();
    expect(spyUpdateEmit).toHaveBeenCalled();
    expect(spyStatusUpdate).toHaveBeenCalled();
    expect(spyUpdateStatusFormFormReset).toHaveBeenCalled();
  });
});
