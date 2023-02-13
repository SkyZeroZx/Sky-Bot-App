import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthModule, AuthService as Auth0Service } from '@auth0/auth0-angular';
import { auth0Config } from '@core/config';
import { AnimationItem } from 'lottie-web';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let swPush: SwPush;
  let toastrService: ToastrService;
  let auth0Service : Auth0Service;

  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };
  let mockServiceWorker = {
    requestSubscription: jasmine.createSpy('requestSubscription'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        AuthModule.forRoot(auth0Config),
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        FormBuilder,
        Auth0Service,
        DatePipe,
        { provide: Router, useValue: mockRouter },
        { provide: SwPush, useValue: mockServiceWorker },
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    swPush = TestBed.inject(SwPush);
    auth0Service = TestBed.inject(Auth0Service);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('LoginComponent Create', () => {
    expect(component).toBeTruthy();
  });


  it('validate onLoopComplete' , () => {
    component.animationItem = {
      stop (){
        return null;
      }
    } as any;
    const spyAuth0Service  = spyOn(auth0Service,'loginWithRedirect')
    component.onLoopComplete()
    expect(spyAuth0Service).toHaveBeenCalled()
  });

  it('validate animationCreated', () => {
    const animationItem: AnimationItem = null;
    component.animationCreated(animationItem);
    expect(component.animationItem).toEqual(animationItem);
  });

});
