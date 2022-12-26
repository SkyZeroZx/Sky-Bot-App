import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '@core/services';
import { environment } from '../../../../environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService {
  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== environment.API_URL) {
      this.spinnerService.initSpinner();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.stopSpinner();
      }),
    );
  }
}
