import { Component, NgZone } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_7GoiCvHm8v.json',
  };
  animationItem: AnimationItem;
  
  constructor(private auth0Service: Auth0Service, private ngZone: NgZone) {}

  onLoopComplete() {
    this.stop();
    this.auth0Service.loginWithRedirect();
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
