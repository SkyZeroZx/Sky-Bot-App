import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject(this.notExistInStorage('darkTheme'));
  private navBar = new BehaviorSubject(this.notExistInStorage('navBar'));
  private swipeBar = new BehaviorSubject(false);

  // Declare event of listening for install pwa in toggle in user options
  public promptEvent: any;

  get getInstallPwa() {
    return this.promptEvent;
  }

  get swipeBar$() {
    return this.swipeBar.asObservable();
  }

  get theme$() {
    return this.theme.asObservable();
  }

  get navBar$() {
    return this.navBar.asObservable();
  }

  setSwipeBar(value: boolean) {
    this.swipeBar.next(value);
  }

  notExistInStorage(item: string): boolean {
    return !(
      localStorage.getItem(item) == null ||
      localStorage.getItem(item) == 'null' ||
      localStorage.getItem(item) == 'false'
    );
  }

  setTheme(option: boolean) {
    localStorage.setItem('darkTheme', option.toString());
    this.theme.next(option);
  }

  setNavBar(option: boolean) {
    localStorage.setItem('navBar', option.toString());
    this.navBar.next(option);
  }
}
