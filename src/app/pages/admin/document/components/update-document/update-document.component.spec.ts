import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedMaterialModule } from '@shared/material/material.module';
import { UpdateDocumentComponent } from './update-document.component';
import { DocumentService } from '@core/services';
import { of } from 'rxjs';
import { DocumentMock } from '../../document.mock.spec';

fdescribe('UpdateDocumentComponent', () => {
  let component: UpdateDocumentComponent;
  let fixture: ComponentFixture<UpdateDocumentComponent>;
  let documentService: DocumentService;
  let toastrService: ToastrService;
  const document = DocumentMock.document;
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
      declarations: [UpdateDocumentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    documentService = TestBed.inject(DocumentService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(UpdateDocumentComponent);
    component = fixture.componentInstance;
    component.document = document;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormUpdateDocument = spyOn(component, 'createFormUpdateDocument');
    component.ngOnInit();
    expect(spyCreateFormUpdateDocument).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyShowModal = spyOn(component.modalUpdateDocument, 'show');
    component.ngAfterViewInit();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.updateDocumentForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });

  it('validate updateDocument', () => {
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyUpdateDocument = spyOn(documentService, 'updateDocument').and.returnValue(
      of(null),
    );
    const spyToast = spyOn(toastrService,'success');
    component.updateDocument();
    expect(spyUpdateDocument).toHaveBeenCalledOnceWith(
      component.updateDocumentForm.value,
    );
    expect(spyToast).toHaveBeenCalled();
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
