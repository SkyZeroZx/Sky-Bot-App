import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SharedMaterialModule } from '../material/material.module';
import { PreviewFileModule } from '../preview-file/preview-file.module';
import { AuthModule, AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { StatusDocumentTabComponent } from './status-document-tab.component';
import { auth0Config, toastrConfig } from '@core/config';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ListCertificateComponent, ListStatusComponent } from './components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('StatusDocumentTabComponent', () => {
  let component: StatusDocumentTabComponent;
  let fixture: ComponentFixture<StatusDocumentTabComponent>;
  let auth0Service: Auth0Service;
  let listCertificateComponent: ListCertificateComponent;
  let listCertificateComponentFixture: ComponentFixture<ListCertificateComponent>;
  let listStatusComponent: ListStatusComponent;
  let listStatusComponentFixture: ComponentFixture<ListStatusComponent>;

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
      declarations: [
        StatusDocumentTabComponent,
        ListCertificateComponent,
        ListStatusComponent,
      ],
      providers: [Auth0Service, { provide: ToastrService, useClass: ToastrService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    auth0Service = TestBed.inject(Auth0Service);
    listCertificateComponentFixture = TestBed.createComponent(ListCertificateComponent);
    listStatusComponentFixture = TestBed.createComponent(ListStatusComponent);
    fixture = TestBed.createComponent(StatusDocumentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validete ngOnInit', () => {
    const user: User = {
      role: 'student',
    };
    const spyAuth0Service = spyOn(auth0Service.user$, 'pipe').and.returnValue(of(user));
    component.ngOnInit();
    expect(spyAuth0Service).toHaveBeenCalled();
  });

  it('validate onUpdate', () => {
    const spyUpdateEmit = spyOn(component.update, 'emit');
    component.onUpdate();
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
