import { Component, OnInit } from '@angular/core';
import { ThemeService, AuthService } from '@core/services';
import { RouteInfo } from '@core/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    this.authService.getRoutesByRole().subscribe((routes) => {
      this.menuItems = routes;
    });
  }

  onSwipe(event: Event) {
    event.preventDefault();
    this.themeService.setSwipeBar(false);
  }
}
