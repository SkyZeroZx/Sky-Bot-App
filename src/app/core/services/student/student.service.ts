import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, QueryParamsPagination, Response, Student } from '@core/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(
    queryParameters?: QueryParamsPagination,
  ): Observable<Pagination<Student[]>> {
    let params: HttpParams = new HttpParams();
    params = params.set('take', queryParameters.take);
    params = params.set('page', queryParameters.page);
    params = params.set('search', queryParameters.search || '');
    params = params.set('optionalSearch', queryParameters.optionalSearch || '');
    return this.http.get<Pagination<Student[]>>(`${environment.API_URL}/student`, {
      params,
    });
  }

  createStudent(createStudent: Student): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/student`, createStudent);
  }

  updateStudent(studentUpdate: Student): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.API_URL}/student/${studentUpdate.idStudent}`,
      studentUpdate,
    );
  }

  deleteStudent(idStudent: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/student/${idStudent}`);
  }
}
