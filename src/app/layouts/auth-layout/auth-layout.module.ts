import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { AuthLayoutRoutes } from '../auth-layout/auth-layout.routing';
import { LoginComponent } from '../../pages/auth/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    LottieModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
})
export class AuthLayoutModule {}
