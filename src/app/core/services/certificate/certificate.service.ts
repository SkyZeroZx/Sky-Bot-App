import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Certificate, Response } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getCertificates(idStatusDocument: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(
      `${environment.API_URL}/certificate/${idStatusDocument}`,
    );
  }

  uploadCertificate(data): Observable<Response> {
    return;
  }
}
