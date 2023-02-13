import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { auth0Config } from '@core/config';
import { CertificateService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { StatusDocumentRoutingModule } from '../../../../status-document.routing';
import { CreateCertificateComponent } from './create-certificate.component';
import { StatusDocumentDetailMock } from '../../status-document-detail.mock.spec';
import { of, throwError } from 'rxjs';
import { CertificateCreate } from '@core/interfaces';
import * as helper from '@core/helpers/helper';

fdescribe('CreateCertificateComponent', () => {
  let component: CreateCertificateComponent;
  let fixture: ComponentFixture<CreateCertificateComponent>;
  let certificateService: CertificateService;
  let toastrService: ToastrService;
  const statusDocumentByStudent = StatusDocumentDetailMock.statusDocumentByStudent;
  const mockFile: File = null;
  const mockEventFile: any = {
    target: {
      files: [mockFile],
    },
  };
  const previewFile: helper.PreviewFile = {
    result: 'awesome_result',
    isDoc: false,
  };

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
      providers: [CertificateService],
      declarations: [CreateCertificateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.inject(ToastrService);
    certificateService = TestBed.inject(CertificateService);
    fixture = TestBed.createComponent(CreateCertificateComponent);
    component = fixture.componentInstance;
    component.statusDocumentByStudent = statusDocumentByStudent;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate uploadCertificate', () => {
    const spyCreateCertificate = spyOn(
      certificateService,
      'createCertificate',
    ).and.returnValue(of(null));
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyToastrService = spyOn(toastrService, 'success');
    const certificateCreate: CertificateCreate = {
      file: component.fileCertificate,
      idStatusDocument: component.statusDocumentByStudent.idStatusDocument,
    };
    component.uploadCertificate();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyCreateCertificate).toHaveBeenCalledWith(certificateCreate);
    expect(spyUpdateEmit).toHaveBeenCalled();
  });

  it('Validate certificateSelected OK', async () => {
    const spyHelperPreview = spyOn(helper, 'previewUrlFile').and.returnValue(
      Promise.resolve(previewFile),
    );
    const spySwalFire = spyOn(component.swalUploadCertificate, 'fire');
    await component.certificateSelected(mockEventFile);
    expect(component.swalFilePreview).toEqual(previewFile);
    expect(component.inputFileCertificate.nativeElement.value).toEqual('');
    expect(spyHelperPreview).toHaveBeenCalled();
    expect(spySwalFire).toHaveBeenCalled();
  });

  it('validate certificateSelected', async () => {
    const spyHelperPreview = spyOn(helper, 'previewUrlFile').and.returnValue(
      Promise.reject(new Error()),
    );
    const spyToastError = spyOn(toastrService, 'error');
    await component.certificateSelected(mockEventFile);
    expect(spyToastError).toHaveBeenCalled();
    expect(spyHelperPreview).toHaveBeenCalled();
  });
});
