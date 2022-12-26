import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDocument, Document as IDocument, Response } from '@core/interfaces';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  getDocuments(): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(`${environment.API_URL}/document`);
  }

  createDocument(createDocument: CreateDocument): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/document`, createDocument);
  }

  updateDocument(updateDocument: IDocument): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.API_URL}/document/${updateDocument.idDocument}`,
      updateDocument,
    );
  }

  deleteDocument(idDocument: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/document/${idDocument}`);
  }
}
