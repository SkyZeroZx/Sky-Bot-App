import { Component, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../../core/animations/router-animations';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
  animations: [slideInAnimation],
})
export class PublicLayoutComponent {
  constructor(private contexts: ChildrenOutletContexts, private renderer: Renderer2) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
