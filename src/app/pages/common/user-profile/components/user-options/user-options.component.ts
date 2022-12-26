import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwPush } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { ThemeService, UserService } from '@core/services';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent implements OnInit {
  userOptionsForm: FormGroup;

  constructor(
    private themeService: ThemeService,
    private swPush: SwPush,
    private toastrService: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createUserOptionsForm();
  }

  createUserOptionsForm(): void {
    this.userOptionsForm = this.fb.group({
      userTheme: [this.themeService.notExistInStorage('darkTheme')],
      userNavBar: [this.themeService.notExistInStorage('navBar')],
      notifications: [this.themeService.notExistInStorage('notificaciones')],
      userInstallPwa: [false],
    });
  }

  onChangeTheme({ checked }) {
    this.themeService.setTheme(checked);
  }

  onChangeNavBar({ checked }) {
    this.themeService.setNavBar(checked);
  }

  onChangeInstallPwa({ checked }) {
    if (checked) {
      this.installPwa();
    }
  }

  onChangeNotifications({ checked }) {
    if (checked) {
      this.suscribeToNotifications();
      localStorage.setItem('notificaciones', 'true');
    } else {
      localStorage.setItem('notificaciones', 'false');
    }
  }

  installPwa() {
    this.themeService.getInstallPwa.prompt();
  }

  shouldInstall(): boolean {
    return (
      !window.matchMedia('(display-mode: standalone)').matches &&
      this.themeService.getInstallPwa
    );
  }

  suscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      })
      .then((token) => {
        this.saveNotification(token);
      })
      .catch((_err) => {
        this.disableNotifications();
        this.toastrService.error('Sucedio un error al suscribirse ');
      });
  }

  disableNotifications() {
    this.userOptionsForm.controls.notifications.setValue(false, { emitEvent: false });
    localStorage.setItem('notificaciones', 'false');
  }

  saveNotification(token: PushSubscription) {
    this.userService.saveUserNotification(token).subscribe({
      next: (_res) => {
        this.toastrService.success('Las notificaciones fueron habilitadas exitosamente');
      },
      error: (_err) => {
        console.log('Error al suscribir notificaciones saveNotification ', _err);
        this.disableNotifications();
        this.toastrService.error('Sucedio un error al suscribir sus notificaciones ');
      },
    });
  }
}
