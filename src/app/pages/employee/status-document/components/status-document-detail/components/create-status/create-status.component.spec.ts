import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { auth0Config } from '@core/config';
import { StatusService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { StatusDocumentRoutingModule } from '../../../../status-document.routing';
import { CreateStatusComponent } from './create-status.component';
import { StatusDocumentDetailMock } from '../../status-document-detail.mock.spec';
import { of } from 'rxjs';

fdescribe('CreateStatusComponent', () => {
  let component: CreateStatusComponent;
  let fixture: ComponentFixture<CreateStatusComponent>;
  let statusService: StatusService;
  let toastrService: ToastrService;
  const statusDocumentByStudent = StatusDocumentDetailMock.statusDocumentByStudent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        AuthModule.forRoot(auth0Config),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        NgxDocViewerModule,
        ModalModule,
        StatusDocumentRoutingModule,
        StatusDocumentTabModule,
      ],
      providers: [StatusService],
      declarations: [CreateStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusService = TestBed.inject(StatusService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(CreateStatusComponent);
    component = fixture.componentInstance;
    component.statusDocumentByStudent = statusDocumentByStudent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormStatus = spyOn(component, 'createFormStatus');
    component.ngOnInit();
    expect(spyCreateFormStatus).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyModalCreateStatus = spyOn(component.modalCreateStatus, 'show');
    component.ngAfterViewInit();
    expect(spyModalCreateStatus).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.createStatusForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyResetForm).toHaveBeenCalled();
    expect(spyCloseEmit).toHaveBeenCalled();
  });

  it('validate createStatus', () => {
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyCreateStatusForm = spyOn(component.createStatusForm, 'reset');
    const spyToastrService = spyOn(toastrService, 'success');
    const spyStatusService = spyOn(statusService, 'createStatus').and.returnValue(
      of(null),
    );
    const searchValue = component.createStatusForm.value;
    component.createStatus();
    expect(spyUpdateEmit).toHaveBeenCalled();
    expect(spyCreateStatusForm).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyStatusService).toHaveBeenCalledWith(searchValue);
  });
});
