import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AuthService, ThemeService } from '@core/services';
import { User } from '@core/interfaces';
import { ROUTES_ADMIN } from '@core/routes/menuItems';
import { take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[] = [];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  userLogged: User;
  isCollapsed = true;
  closeResult: string;
  $layer: any;
  navTitle: string = '';

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private themeService: ThemeService,
    private auth0Service: Auth0Service,
    private authService: AuthService,
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES_ADMIN;
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.getInfoUser();
    this.onChangeRouterEvents();
    this.changeOnSwipe();
  }

  getInfoUser() {
    this.auth0Service.user$.pipe(take(1)).subscribe({
      next: (user) => {
        this.userLogged = {
          username: user.email,
          photo: user?.photo,
        } as User;
      },
    });
  }

  changeOnSwipe() {
    this.themeService.swipeBar$.subscribe((res) => {
      if (res) {
        this.sidebarToggle();
      } else {
        this.sidebarClose();
      }
    });
  }

  onChangeRouterEvents() {
    this.router.events.subscribe((_event) => {
      this.sidebarClose();
      this.$layer = document.getElementsByClassName('close-layer')[0];
      if (this.$layer) {
        this.$layer.remove();
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 10);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      if (mainPanel?.style !== undefined) {
        setTimeout(function () {
          mainPanel.style.position = '';
        }, 10);
      }
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (const item of this.listTitles) {
      if (item.path === titlee) {
        this.navTitle = item.title;
      }
    }
  }

  onLogout() {
    this.authService.logOut();
  }

  changePassword() {
    this.authService.swalChangePassword();
  }
}
