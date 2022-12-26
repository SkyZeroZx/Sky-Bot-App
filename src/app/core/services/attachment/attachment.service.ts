import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Attachment } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private http: HttpClient) {}

  getAttachment(idStatusDocument: string): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(
      `${environment.API_URL}/attachment/${idStatusDocument}`,
    );
  }
}
