import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService, AuthService } from '@core/services';
import { SharedMock } from '../shared.mock.spec';
import { SidebarComponent } from './sidebar.component';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from '../../../core/config';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ROUTES_EMPLOYEE } from '@core/routes/menuItems';
import { of } from 'rxjs';

fdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;
  let themeService: ThemeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        CommonModule,
        RouterModule,
        SweetAlert2Module.forRoot(),
        AuthModule.forRoot(auth0Config),
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(SharedMock.userStorage));
    fixture = TestBed.createComponent(SidebarComponent);
    authService = TestBed.inject(AuthService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    localStorage.setItem('user', JSON.stringify(SharedMock.userStorage));
    fixture.detectChanges();
  });

  it('SidebarComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyGetRouterByRole = spyOn(authService, 'getRoutesByRole').and.callFake(() => {
      return of(ROUTES_EMPLOYEE);
    });
    component.ngOnInit();
    expect(component.menuItems).toEqual(ROUTES_EMPLOYEE);
    expect(spyGetRouterByRole).toHaveBeenCalled();
  });

  it('Validate onSwipe', () => {
    let mockEvent: Event = new Event('swipe');
    const spySetSwipeBar = spyOn(themeService, 'setSwipeBar').and.callThrough();
    component.onSwipe(mockEvent);
    expect(spySetSwipeBar).toHaveBeenCalled();
  });
});
