import { auth0Config, MyHammerConfig, toastrConfig, playerFactory } from '@core/config';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { ErrorInterceptorService, LoaderInterceptorService } from '@core/services';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import {
  SweetAlert2LoaderService,
  SweetAlert2Module,
} from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ContentLayoutComponent } from '../app/layouts/content-layout/content-layout.component';
import { AppComponent } from '../app/app.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { AuthLayoutComponent } from '../app/layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingLayoutComponent } from '../app/layouts/loading-layout/loading-layout.component';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PublicLayoutComponent } from '../app/layouts/public-layout/public-layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from '@shared/common/shared.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(toastrConfig),
    NgxSpinnerModule,
    AuthModule.forRoot(auth0Config),
    ServiceWorkerModule.register('custom-service-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:5000',
    }),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    LoadingLayoutComponent,
    PublicLayoutComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: ToastrService, useClass: ToastrService },
    { provide: SweetAlert2LoaderService, useClass: SweetAlert2LoaderService },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
