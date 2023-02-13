import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService, UserService } from '@core/services';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { UserPhotoComponent } from './components/user-photo/user-photo.component';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileMock } from './user-profile.mock.spec';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from '../../../core/config';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

fdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let swPush: SwPush;
  let authService: AuthService;
  let toastrService: ToastrService;
  let userService: UserService;
  const userProfile = UserProfileMock.userProfileMock;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent, UserOptionsComponent, UserPhotoComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        CommonModule,
        FormsModule,
        AuthModule.forRoot(auth0Config),
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        MatSliderModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSlideToggleModule,
      ],
      providers: [
        ToastrService,
        UserService,
        AuthService,
        SwPush,
        FormBuilder,
        DatePipe,
        { provide: SwPush, useValue: UserProfileMock.mockServiceWorker },
        { provide: Router, useValue: mockRouter },
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    swPush = TestBed.inject(SwPush);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserProfileComponent be Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateUserProfileForm = spyOn(
      component,
      'createUserProfileForm',
    ).and.callThrough();
    const spyGetProfile = spyOn(component, 'getProfile').and.callThrough();
    component.ngOnInit();
    expect(spyGetProfile).toHaveBeenCalled();
    expect(spyCreateUserProfileForm).toHaveBeenCalled();
  });

  it('validate changePassword', () => {
    const spyChangePassword = spyOn(authService, 'swalChangePassword');
    component.changePassword();
    expect(spyChangePassword).toHaveBeenCalled();
  });

  it('validate logOut', () => {
    const spyLogOut = spyOn(authService, 'logOut');
    component.logOut();
    expect(spyLogOut).toHaveBeenCalled();
  });

  it('validate updateProfile', () => {
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(of(null));
    const spyToast = spyOn(toastrService, 'success');
    component.updateProfile();
    expect(spyToast).toHaveBeenCalled();
    expect(spyUpdateUser).toHaveBeenCalled();
  });

  it('validate getProfile', () => {
    const spyUserForm = spyOn(component.userProfileForm, 'patchValue');
    const spyGetProfile = spyOn(userService, 'getProfile').and.returnValue(of(userProfile));
    component.getProfile();
    expect(spyGetProfile).toHaveBeenCalled();
    expect(spyUserForm).toHaveBeenCalled();
    expect(component.photoUser).toEqual(userProfile.photo);
  });
});
