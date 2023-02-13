import { AfterContentInit, Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { facebookPluginMessenger } from '../../../../assets/facebook-plugin/facebook';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterContentInit {
  options: AnimationOptions = {
    path: '../../assets/animations/landing-document.json',
  };

  
  ngAfterContentInit(): void {
    facebookPluginMessenger();
  }
}
