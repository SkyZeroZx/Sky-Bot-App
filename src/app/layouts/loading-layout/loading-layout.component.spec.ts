import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLayoutComponent } from './loading-layout.component';
import { AuthService } from '@core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from '@core/config';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '@core/interfaces';
import { of } from 'rxjs';
import {
  AnimationDirection,
  AnimationEventCallback,
  AnimationEventName,
  AnimationItem,
  AnimationSegment,
} from 'lottie-web';

fdescribe('LoadingLayoutComponent', () => {
  let component: LoadingLayoutComponent;
  let fixture: ComponentFixture<LoadingLayoutComponent>;
  let authService: AuthService;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AuthModule.forRoot(auth0Config),
        SweetAlert2Module.forRoot(),
      ],
      providers: [AuthService],
      declarations: [LoadingLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    fixture = TestBed.createComponent(LoadingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate onLoopComplete', () => {
    const routerInfoMock: RouteInfo[] = [
      {
        path: '',
        title: '',
        icon: '',
        class: '',
        id: '',
      },
    ];
    component.animationItem = {
      stop() {
        return null;
      },
    } as any;
    const spyRouter = spyOn(router, 'navigateByUrl');
    const spyAuthService = spyOn(authService, 'getRoutesByRole').and.returnValue(
      of(routerInfoMock),
    );
    component.onLoopComplete();

    expect(spyRouter).toHaveBeenCalled();
    expect(spyAuthService).toHaveBeenCalled();
  });

  it('validate animationCreated', () => {
    const animationItem: AnimationItem = null;
    component.animationCreated(animationItem);
    expect(component.animationItem).toEqual(animationItem);
  });
});
