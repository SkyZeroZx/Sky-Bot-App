import { Component, OnInit } from '@angular/core';
import { ThemeService, AuthService } from '@core/services';
import { RouteInfo } from '@core/interfaces';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  darkTheme: boolean = false;
  menuItems: RouteInfo[] = [];

  constructor(private themeService: ThemeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.tabNavigation();
    this.enabledDarkTheme();
    this.getRoutesByRole();
  }

  getRoutesByRole() {
    this.authService.getRoutesByRole().subscribe((routes) => {
      this.menuItems = routes;
    });
  }

  enabledDarkTheme() {
    this.themeService.theme$.subscribe({
      next: (res) => {
        this.darkTheme = res;
      },
    });
  }

  tabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((clickedTab) => {
      clickedTab.addEventListener('click', () => {
        tabs.forEach((tab) => {
          tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
      });
    });
  }
}
