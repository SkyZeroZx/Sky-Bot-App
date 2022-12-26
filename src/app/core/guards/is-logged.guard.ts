import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLogged implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    console.log('Auth Guard IsLogin');
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        console.log('user is', user);
        if (user) {
          this.router.navigateByUrl('/loading');

          return false;
        }

        return true;
      }),
    );
  }
}
