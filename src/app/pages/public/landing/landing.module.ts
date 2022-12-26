import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './landing.routing';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LottieModule,
    LottieCacheModule,
    NgOptimizedImage,
    RouterModule.forChild(landingRoutes),
  ],
})
export class LandingModule {}
