import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { StatusDocumentService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { auth0Config, toastrConfig } from '@core/config';
import { DocumentStudentDetailMock } from './document-student.mock.spec';
import { DocumentStudentRoutingModule } from '../../document-student.routing';
import { DocumentStudentDetailComponent } from './document-student-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

fdescribe('DocumentStudentDetailComponent', () => {
  let component: DocumentStudentDetailComponent;
  let fixture: ComponentFixture<DocumentStudentDetailComponent>; 
  let activatedRoute: ActivatedRoute;
  let statusDocumentService: StatusDocumentService;
  const statusDocumentByStudentDetail =
    DocumentStudentDetailMock.statusDocumentByStudentDetail;
  const idStatusDocument = '342342342';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(toastrConfig),
        AuthModule.forRoot(auth0Config),
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        DocumentStudentRoutingModule,
        StatusDocumentTabModule,
      ],
      providers: [StatusDocumentService],
      declarations: [DocumentStudentDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusDocumentService = TestBed.inject(StatusDocumentService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(DocumentStudentDetailComponent);
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

  it('validate getRouteParams', () => {
    const spyGetStatusDocumentById = spyOn(component, 'getStatusDocumentById');
    component.getRouteParams();
    expect(spyGetStatusDocumentById).toHaveBeenCalled();
  });

  it('validate getStatusDocumentById', () => {
    const spyStatusDocumentService = spyOn(
      statusDocumentService,
      'getStatusDocumentById',
    ).and.returnValue(of(statusDocumentByStudentDetail));

    component.getStatusDocumentById(idStatusDocument);
    expect(spyStatusDocumentService).toHaveBeenCalledWith(idStatusDocument);
    expect(component.listAttachment).toEqual(
      statusDocumentByStudentDetail.listAttachment,
    );
    expect(component.listCertificate).toEqual(
      statusDocumentByStudentDetail.listCertificate,
    );
    expect(component.statusDocument).toEqual(
      statusDocumentByStudentDetail.statusDocument,
    );
    expect(component.status).toEqual(
      statusDocumentByStudentDetail.statusDocument[0].status,
    );
  });



});
