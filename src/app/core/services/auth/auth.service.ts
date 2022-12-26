import { Injectable, Inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { ROUTES_ADMIN, ROUTES_EMPLOYEE, ROUTES_STUDENT } from '@core/routes/menuItems';
import { map, Observable, of, take, firstValueFrom } from 'rxjs';
import { RouteInfo, Response } from '@core/interfaces';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth0Service: Auth0Service,
    private readonly sweetAlert2Loader: SweetAlert2LoaderService,
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient,
  ) {}

  getRoutesByRole(): Observable<RouteInfo[]> {
    return this.auth0Service.user$.pipe(
      take(1),
      map(({ role }) => {
        console.log('My role is ', role);
        switch (role) {
          case 'admin':
            return ROUTES_ADMIN;
          case 'student':
            return ROUTES_STUDENT;
          case 'employee':
            return ROUTES_EMPLOYEE;
          default:
            of(new Error('Invalid role'));
        }
      }),
    );
  }

  async swalChangePassword(): Promise<void>  {
    const swal = await this.sweetAlert2Loader.swal;
    const { isConfirmed } = await swal.fire({
      title: 'Cambio de contraseña',
      text: '¿Esta seguro? Se le enviara un correo con el enlace',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });
    if (isConfirmed) {
      const response = await firstValueFrom(
        this.http.post<Response>(`${environment.API_URL}/auth/change-password`, null),
      );
      if (response) {
        swal.fire({ title: 'Cambio de contraseña', icon: 'success' });
      }
    }
  }

  async logOut(): Promise<void> {
    const swal = await this.sweetAlert2Loader.swal;
    swal
      .fire({
        title: 'Va cerrar sesión',
        text: '¿Esta seguro?',
        icon: 'warning',
        showCancelButton: true,
        focusCancel: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.auth0Service.logout({ returnTo: this.doc.location.origin });
        }
      });
  }
}
