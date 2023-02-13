import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule, AuthService as Auth0Service } from '@auth0/auth0-angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  SweetAlert2LoaderService,
  SweetAlert2Module,
} from '@sweetalert2/ngx-sweetalert2';
import { auth0Config } from '../../../core/config';
import { AuthService, ThemeService } from '../../../core/services';

import { SharedMock } from '../shared.mock.spec';
import { NavigationBarComponent } from './navigation-bar.component';

fdescribe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let themeService: ThemeService;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [
        BrowserAnimationsModule,
        AuthModule.forRoot(auth0Config),
        CommonModule,
        RouterModule,
        SweetAlert2Module.forRoot(),
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthService, Auth0Service, ThemeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    authService = TestBed.inject(AuthService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(SharedMock.userStorage));
    fixture.detectChanges();
  });

  it('NavigationBarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyTabNavigation = spyOn(component, 'tabNavigation');
    const spyEnabledDarkTheme = spyOn(component, 'enabledDarkTheme');
    const spyGetRouterOfRoles = spyOn(component, 'getRoutesByRole');
    component.ngOnInit();
    expect(spyTabNavigation).toHaveBeenCalled();
    expect(spyEnabledDarkTheme).toHaveBeenCalled();
    expect(spyGetRouterOfRoles).toHaveBeenCalled();
  });

  it('Validate enabledDarkTheme', () => {
    themeService.setTheme(true);
    component.enabledDarkTheme();
    expect(component.darkTheme).toBeTruthy();
    themeService.setTheme(false);
    component.enabledDarkTheme();
    expect(component.darkTheme).toBeFalsy();
  });

  it('Validate tabNavigation', fakeAsync(() => {
    const spyDocument = spyOn(document, 'querySelectorAll').and.callThrough();
    component.tabNavigation();
    expect(spyDocument).toHaveBeenCalled();
 
  }));
});
