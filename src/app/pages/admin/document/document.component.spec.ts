import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedMaterialModule } from '@shared/material/material.module';
import { DocumentComponent } from './document.component';
import { DocumentService } from '@core/services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { DocumentMock } from './document.mock.spec';

fdescribe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;
  let documentService: DocumentService;
  let toastrService: ToastrService;
  const searchValue = 'search';
  const listDocuments = DocumentMock.listDocuments;
  const document = DocumentMock.document;
  const idDocument = DocumentMock.idDocument;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        SweetAlert2Module,
        ModalModule,
      ],
      providers: [DocumentService, ToastrService],
      declarations: [DocumentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    documentService = TestBed.inject(DocumentService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateDocumentForm = spyOn(component, 'createDocumentForm');
    const spyOnChangeFilter = spyOn(component, 'onChangeFilter');
    const spyGetDocuments = spyOn(component, 'getDocuments');
    component.ngOnInit();
    expect(spyCreateDocumentForm).toHaveBeenCalled();
    expect(spyOnChangeFilter).toHaveBeenCalled();
    expect(spyGetDocuments).toHaveBeenCalled();
  });

  it('validate onChangeFilter', fakeAsync(() => {
    component.dataSource = new MatTableDataSource([]);
    component.documentForm.controls.filter.setValue(searchValue);
    tick(1_000);
    expect(component.dataSource.filter).toEqual(searchValue);
  }));

  it('validate getDocuments', () => {
    const spyGetDocuments = spyOn(documentService, 'getDocuments').and.returnValue(
      of(listDocuments),
    );
    component.getDocuments();
    expect(spyGetDocuments).toHaveBeenCalled();
    expect(component.dataSource.paginator).toEqual(component.paginator);
  });

  it('validate shoModalUpdateDocument', () => {
    component.shoModalUpdateDocument(document);
    expect(component.documentSelected).toEqual(document);
    expect(component.showUpdateDocument).toBeTrue();
  });

  it('validate showModalCreateDocument', () => {
    component.showModalCreateDocument();
    expect(component.showCreateDocument).toBeTrue();
  });

  it('validate deleteDocument', () => {

    const spyDeleteDocument = spyOn(documentService, 'deleteDocument').and.returnValue(
      of(null),
    );
    const spyGetDocuments = spyOn(documentService, 'getDocuments').and.returnValue(
      of(listDocuments),
    );;
    const spyToast = spyOn(toastrService, 'success');
    component.deleteDocument(idDocument);
    expect(spyDeleteDocument).toHaveBeenCalledWith(idDocument);
    expect(spyToast).toHaveBeenCalled();
    expect(spyGetDocuments).toHaveBeenCalled();
  });
});
