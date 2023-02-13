import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ThemeService } from '@core/services/theme/theme.service';
import { ErrorInterceptorService } from './core/services';
import { LottieCacheModule } from 'ngx-lottie';
import { HttpClient, HttpClientModule } from '@angular/common/http';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let swUpdate: SwUpdate;
  let themeService: ThemeService;
  let httpClient: HttpClient;
  let mockSwUpdate: any = {
    versionUpdates: of(null),
  };

  let mockEvent: any = {
    preventDefault() {
      return;
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        FormsModule,
        LottieCacheModule.forRoot(),
        RouterTestingModule,
        ServiceWorkerModule,
      ],
      providers: [
        NgxSpinnerService,
        ReactiveFormsModule,
        ThemeService,
        { provide: SwUpdate, useValue: mockSwUpdate },
        { provide: ToastrService, useClass: ToastrService },
        ErrorInterceptorService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    themeService = TestBed.inject(ThemeService);
    httpClient = TestBed.inject(HttpClient);
    swUpdate = TestBed.inject(SwUpdate);
    component = fixture.debugElement.componentInstance;
  });

  it('AppComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyExistUpdate = spyOn(component, 'existUpdate');
    const spyPingToServer = spyOn(component, 'pingToServer');
    component.ngOnInit();
    expect(spyPingToServer).toHaveBeenCalled();
    expect(spyExistUpdate).toHaveBeenCalled();
  });

  it('validate pingToServer', () => {
    const spyHttpGet = spyOn(httpClient, 'get').and.callFake(() => of(null));
    component.pingToServer();
    expect(spyHttpGet).toHaveBeenCalled();
  });

  it('Validate onBeforeInstallPrompt', () => {
    component.onBeforeInstallPrompt(mockEvent);
    expect(themeService.promptEvent).toEqual(mockEvent);
  });

  it('Validate existUpdate', () => {
    expect(component.existUpdate()).toBeUndefined();
  });
});
