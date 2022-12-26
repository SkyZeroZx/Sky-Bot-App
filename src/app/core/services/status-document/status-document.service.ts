import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Pagination,
  QueryParamsPagination,
  Response,
  StatusDocument,
  StatusDocumentByStudent,
  StatusDocumentByStudentDetail,
} from '@core/interfaces';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusDocumentService {
  constructor(private http: HttpClient) {}

  createStatusDocument(createStatusDocument: StatusDocument): Observable<Response> {
    return this.http.post<Response>(
      `${environment.API_URL}/status-document`,
      createStatusDocument,
    );
  }

  getStatusDocumentPagination(
    queryParameters?: QueryParamsPagination,
  ): Observable<Pagination<StatusDocumentByStudent[]>> {
    let params: HttpParams = new HttpParams();
    params = params.set('take', queryParameters.take);
    params = params.set('page', queryParameters.page);
    params = params.set('search', queryParameters.search || '');
    params = params.set('optionalSearch', queryParameters.optionalSearch || '');
    return this.http.get<Pagination<StatusDocumentByStudent[]>>(
      `${environment.API_URL}/status-document`,
      {
        params,
      },
    );
  }

  getStatusDocumentById(
    idStatusDocument: string,
  ): Observable<StatusDocumentByStudentDetail> {
    return this.http.get<StatusDocumentByStudentDetail>(
      `${environment.API_URL}/status-document/${idStatusDocument}`,
    );
  }

  getStatusDocumentByStudent(): Observable<StatusDocumentByStudent[]> {
    return this.http.get<StatusDocumentByStudent[]>(
      `${environment.API_URL}/status-document/status-document-dni`,
    );
  }
}
