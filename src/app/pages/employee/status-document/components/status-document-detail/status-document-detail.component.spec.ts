import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { StatusDocumentService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { StatusDocumentRoutingModule } from '../../status-document.routing';
import { StatusDocumentDetailComponent } from './status-document-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateCertificateComponent, CreateStatusComponent } from './components';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from '@core/config';
import { StatusDocumentDetailMock } from './status-document-detail.mock.spec';
import { of } from 'rxjs';

fdescribe('StatusDocumentDetailComponent', () => {
  let component: StatusDocumentDetailComponent;
  let fixture: ComponentFixture<StatusDocumentDetailComponent>;
  let statusDocumentService: StatusDocumentService;
  const statusDocumentByStudentDetail =
    StatusDocumentDetailMock.statusDocumentByStudentDetail;
  const idStatusDocument = StatusDocumentDetailMock.idStatusDocument;

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
      providers: [StatusDocumentService],
      declarations: [
        StatusDocumentDetailComponent,
        CreateCertificateComponent,
        CreateStatusComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusDocumentService = TestBed.inject(StatusDocumentService);
    fixture = TestBed.createComponent(StatusDocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyGetRouteParams = spyOn(component, 'getRouteParams');
    component.ngOnInit();
    expect(spyGetRouteParams).toHaveBeenCalled();
  });

  it('validate showModalCreateStatus', () => {
    expect(component.showCreateStatus).toBeFalsy();
    component.showModalCreateStatus();
    expect(component.showCreateStatus).toBeTruthy();
  });

  it('validate getRouteParams', () => {
    const spyGetStatusDocumentById = spyOn(component, 'getStatusDocumentById');
    component.getRouteParams();
    expect(spyGetStatusDocumentById).toHaveBeenCalled();
  });

  it('validate getStatusDocumentById', () => {
    const spyGetStatusDocumentById = spyOn(
      statusDocumentService,
      'getStatusDocumentById',
    ).and.returnValue(of(statusDocumentByStudentDetail));
    component.getStatusDocumentById(idStatusDocument);
    expect(spyGetStatusDocumentById).toHaveBeenCalledWith(idStatusDocument);
    expect(component.statusDocumentByStudent).toEqual(
      statusDocumentByStudentDetail.statusDocumentByStudent,
    );
    expect(component.statusDocument).toEqual(
      statusDocumentByStudentDetail.statusDocument,
    );
    expect(component.listAttachment).toEqual(
      statusDocumentByStudentDetail.listAttachment,
    );
    expect(component.listCertificate).toEqual(
      statusDocumentByStudentDetail.listCertificate,
    );
  });
});
