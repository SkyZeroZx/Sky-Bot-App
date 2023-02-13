import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { toastrConfig, auth0Config } from '@core/config';
import { SharedMaterialModule } from '@shared/material/material.module';
import { PreviewFileModule } from '../../../preview-file/preview-file.module';

import { ListCertificateComponent } from './list-certificate.component';
import { CertificateService } from '@core/services';
import { of } from 'rxjs';

fdescribe('CertificateComponent', () => {
  let component: ListCertificateComponent;
  let fixture: ComponentFixture<ListCertificateComponent>;
  let toastService: ToastrService;
  let certificateService: CertificateService;
  const idCertificate: string = '213423423432fsdfsd';

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
      declarations: [ListCertificateComponent],
      providers: [
        CertificateService,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastService = TestBed.inject(ToastrService);
    certificateService = TestBed.inject(CertificateService);
    fixture = TestBed.createComponent(ListCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate deleteCertificate', () => {
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyToastSuccess = spyOn(toastService, 'success');
    const spyCertificateDelete = spyOn(
      certificateService,
      'deleteCertificate',
    ).and.returnValue(of(null));
    component.deleteCertificate(idCertificate);
    expect(spyToastSuccess).toHaveBeenCalled();
    expect(spyCertificateDelete).toHaveBeenCalled();
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
