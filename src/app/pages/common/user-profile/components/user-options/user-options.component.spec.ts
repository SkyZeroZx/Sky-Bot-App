import { ComponentFixture, fakeAsync, TestBed, flush, tick } from '@angular/core/testing';
import { UserOptionsComponent } from './user-options.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserProfileMock } from '../../user-profile.mock.spec';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from '@core/config';
 import { ThemeService, UserService } from '@core/services';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

fdescribe('UserOptionsComponent', () => {
  let component: UserOptionsComponent;
  let fixture: ComponentFixture<UserOptionsComponent>;
  let themeService: ThemeService;
  let userService: UserService;
  let swPush: SwPush;
  let toastrService: ToastrService;
  let mockCheckEvent: any = {
    checked: true,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOptionsComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        CommonModule,
        AuthModule.forRoot(auth0Config),
        FormsModule,
        ReactiveFormsModule,
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
        ThemeService,
        UserService,
        SwPush,
        FormBuilder,
        { provide: SwPush, useValue: UserProfileMock.mockServiceWorker },
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsComponent);
    swPush = TestBed.inject(SwPush);
    themeService = TestBed.inject(ThemeService);
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserOptionsComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate onChangeTheme', () => {
    const spyThemeService = spyOn(themeService, 'setTheme').and.callThrough();
    component.onChangeTheme(mockCheckEvent);
    expect(spyThemeService).toHaveBeenCalledWith(mockCheckEvent.checked);
  });

  it('Validate onChangeNavBar', () => {
    const spyThemeServiceSetNavBar = spyOn(themeService, 'setNavBar').and.callThrough();
    component.onChangeNavBar(mockCheckEvent);
    expect(spyThemeServiceSetNavBar).toHaveBeenCalled();
  });

  it('Validate onChangeInstallPwa', () => {
    const spyInstallPwa = spyOn(component, 'installPwa').and.returnValue(null);
    component.onChangeInstallPwa({ checked: true });
    expect(spyInstallPwa).toHaveBeenCalled();
  });

  it('Validate onChangeNotifications is Checked', () => {
    const spySuscribeToNotifications = spyOn(
      component,
      'suscribeToNotifications',
    ).and.returnValue(null);
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.onChangeNotifications({ checked: true });
    expect(spySuscribeToNotifications).toHaveBeenCalled();
    expect(spyLocalStorage).toHaveBeenCalledWith('notificaciones', 'true');
  });

  it('Validate onChangeNotifications is Not Checked', () => {
    const spySuscribeToNotifications = spyOn(
      component,
      'suscribeToNotifications',
    ).and.returnValue(null);
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.onChangeNotifications({ checked: false });
    expect(spySuscribeToNotifications).not.toHaveBeenCalled();
    expect(spyLocalStorage).toHaveBeenCalledWith('notificaciones', 'false');
  });

  it('Validate installPwa', () => {
    themeService.promptEvent = {
      prompt: function () {},
    };
    const spyThemeService = spyOn(themeService.getInstallPwa, 'prompt').and.callFake(
      () => {},
    );
    component.installPwa();
    expect(spyThemeService).toHaveBeenCalled();
  });

  it('Validate suscribeToNotifications OK', fakeAsync(() => {
    const spySaveNotification = spyOn(component, 'saveNotification').and.callThrough();
    const spySwPush = spyOn(swPush, 'requestSubscription').and.returnValue(
      Promise.resolve(null),
    );

    component.suscribeToNotifications();
    tick(1000);

    expect(spySwPush).toHaveBeenCalledWith({
      serverPublicKey: environment.VAPID_PUBLIC_KEY,
    });
    expect(spySaveNotification).toHaveBeenCalled();
  }));

  it('Validate suscribeToNotifications ERROR', fakeAsync(() => {
    const spySaveNotification = spyOn(component, 'saveNotification').and.callThrough();
    const spyDisableNotificaciones = spyOn(
      component,
      'disableNotifications',
    ).and.callThrough();
    const spySwPush = spyOn(swPush, 'requestSubscription').and.returnValue(
      Promise.reject(null),
    );

    component.suscribeToNotifications();

    tick(1000);
    expect(spySwPush).toHaveBeenCalledWith({
      serverPublicKey: environment.VAPID_PUBLIC_KEY,
    });

    expect(spySaveNotification).not.toHaveBeenCalled();
    expect(spyDisableNotificaciones).toHaveBeenCalled();
    flush();
  }));

  it('Validate saveNotification OK', () => {
    const spySaveUserNotification = spyOn(
      userService,
      'saveUserNotification',
    ).and.returnValue(of(UserProfileMock.responseOk));
    const spyToast = spyOn(toastrService, 'success').and.callThrough();

    component.saveNotification(UserProfileMock.tokenMock);

    expect(spySaveUserNotification).toHaveBeenCalledWith(UserProfileMock.tokenMock);
    expect(spyToast).toHaveBeenCalled();
  });

  it('Validate saveNotification ERROR', () => {
    const spySaveUserNotification = spyOn(
      userService,
      'saveUserNotification',
    ).and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToast = spyOn(toastrService, 'error').and.callThrough();
    const spyDisableNotifications = spyOn(
      component,
      'disableNotifications',
    ).and.callThrough();

    component.saveNotification(UserProfileMock.tokenMock);

    expect(spySaveUserNotification).toHaveBeenCalledWith(UserProfileMock.tokenMock);
    expect(spyToast).toHaveBeenCalled();
    expect(spyDisableNotifications).toHaveBeenCalled();
  });
});
