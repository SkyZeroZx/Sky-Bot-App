import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from '@core/services';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private themeService: ThemeService,
  ) {
    this.existUpdate();
    // for fixed bug auth0 redirect initial in first login 
    this.http.get(`${environment.API_URL}`).subscribe(console.log);
  }

  //FOR INSTALL PWA BUTTON
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    e.preventDefault();
    this.themeService.promptEvent = e;
  }

  existUpdate() {
    this.swUpdate.versionUpdates.subscribe({
      next: (res) => {
        console.log('Init PWA ->', res);
      },
    });
  }
}
