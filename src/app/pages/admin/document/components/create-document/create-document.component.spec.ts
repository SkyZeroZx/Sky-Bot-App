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
import { CreateDocumentComponent } from './create-document.component';
import { DocumentService } from '@core/services';
import { of } from 'rxjs';

fdescribe('CreateDocumentComponent', () => {
  let component: CreateDocumentComponent;
  let fixture: ComponentFixture<CreateDocumentComponent>;
  let documentService: DocumentService;
  let toastrService: ToastrService;

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
      declarations: [CreateDocumentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    documentService = TestBed.inject(DocumentService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(CreateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormCreateDocument = spyOn(component, 'createFormCreateDocument');
    component.ngOnInit();
    expect(spyCreateFormCreateDocument).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyShowModal = spyOn(component.modalCreateDocument, 'show');
    component.ngAfterViewInit();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('validate createDocument', () => {
    const spyCreateDocument = spyOn(documentService, 'createDocument').and.returnValue(
      of(null),
    );
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyToast = spyOn(toastrService, 'success');
    component.createDocument();
    expect(spyCreateDocument).toHaveBeenCalledWith(component.createDocumentForm.value);
    expect(spyUpdateEmit).toHaveBeenCalled();
    expect(spyToast).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.createDocumentForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });
});
