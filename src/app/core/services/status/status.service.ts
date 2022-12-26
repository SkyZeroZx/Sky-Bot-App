import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateStatus,
  Response,
  StatusChart,
  StatusChartsReport,
  StatusListChartReport,
  UpdateStatus,
} from '@core/interfaces';
import { map, Observable } from 'rxjs';
import { formatedStatusChartsData } from '@core/helpers/helper';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getChartStatus(statusChart: StatusChart): Observable<StatusListChartReport> {
    return this.http
      .post<StatusChartsReport[]>(
        `${environment.API_URL}/status/chart-status`,
        statusChart,
      )
      .pipe(
        map((res) => {
          return formatedStatusChartsData(res);
        }),
      );
  }

  getChartStatusByIdDocument(
    statusChart: StatusChart,
  ): Observable<StatusListChartReport> {
    return this.http
      .post<StatusChartsReport[]>(
        `${environment.API_URL}/status/chart-status/${statusChart.id}`,
        statusChart,
      )
      .pipe(
        map((res) => {
          return formatedStatusChartsData(res);
        }),
      );
  }

  createStatus(createStatus: CreateStatus): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/status`, createStatus);
  }

  updateStatus(updateStatus: UpdateStatus): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.API_URL}/status/${updateStatus.idStatus}`,
      updateStatus,
    );
  }

  deleteStatus(idStatus: string | number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/status/${idStatus}`);
  }
}
