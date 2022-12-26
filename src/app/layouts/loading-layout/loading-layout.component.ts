import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-loading-layout',
  templateUrl: './loading-layout.component.html',
  styleUrls: ['./loading-layout.component.scss'],
})
export class LoadingLayoutComponent implements OnInit {
  options: AnimationOptions = {
    // path: '../assets/animations/loading.json',
    path: 'https://assets10.lottiefiles.com/packages/lf20_7GoiCvHm8v.json',
  };

  animationItem: AnimationItem;

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router,
  ) {
    console.log('Constructing loading layout component');
  }

  ngOnInit(): void {
    console.log('OnInit called');
  }

  onLoopComplete() {
    console.log('Event Complete animation lottie');
    this.stop();
    this.authService.getRoutesByRole().subscribe({
      next: ([{ path }]) => {
        this.router.navigateByUrl(path);
      },
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.stop();
    });
  }
}
