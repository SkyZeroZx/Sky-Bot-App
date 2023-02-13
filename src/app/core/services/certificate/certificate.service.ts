import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Certificate, CertificateCreate, Response } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  createCertificate({ file, idStatusDocument }: CertificateCreate) {
    const formData: FormData = new FormData();
    formData.append('idStatusDocument', idStatusDocument);
    formData.append('file', file);
    return this.http.post<Response>(`${environment.API_URL}/certificate`, formData);
  }

  getCertificates(idStatusDocument: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(
      `${environment.API_URL}/certificate/${idStatusDocument}`,
    );
  }

  deleteCertificate(idCertificate: string): Observable<Response> {
    return this.http.delete<Response>(
      `${environment.API_URL}/certificate/${idCertificate}`,
    );
  }
}
