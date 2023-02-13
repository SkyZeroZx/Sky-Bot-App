import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-loading-layout',
  templateUrl: './loading-layout.component.html',
  styleUrls: ['./loading-layout.component.scss'],
})
export class LoadingLayoutComponent {
  options: AnimationOptions = {
    // path: '../assets/animations/loading.json',
    path: 'https://assets10.lottiefiles.com/packages/lf20_7GoiCvHm8v.json',
  };

  animationItem: AnimationItem;

  constructor(
    private authService: AuthService,

    private router: Router,
  ) {}

  onLoopComplete() {
    console.log('Event Complete animation lottie');
    this.animationItem.stop();
    this.authService.getRoutesByRole().subscribe({
      next: ([{ path }]) => {
        this.router.navigateByUrl(path);
      },
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
