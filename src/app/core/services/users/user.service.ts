import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
import {
  UpdateUser,
  User,
  Response,
  Pagination,
  QueryParamsPagination,
  CreateUser,
} from '@core/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(queryParameters?: QueryParamsPagination): Observable<Pagination<User[]>> {
    let params: HttpParams = new HttpParams();
    params = params.set('take', queryParameters.take);
    params = params.set('page', queryParameters.page);
    params = params.set('search', queryParameters.search || '');
    params = params.set('optionalSearch', queryParameters.optionalSearch || '');
    return this.http.get<Pagination<User[]>>(`${environment.API_URL}/users`, { params });
  }

  createUser(createUser: CreateUser): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/users`, createUser);
  }

  updateUser(updateUser: UpdateUser): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/users`, updateUser);
  }

  deleteUser(username: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/users/${username}`);
  }

  resetUserPassword(username: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/auth/reset-password`, {
      username: username,
    });
  }

  saveUserNotification(token: PushSubscription): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion`, {
      tokenPush: JSON.stringify(token),
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/profile`);
  }

  sendNotification(users: User[]): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion/send`, {
      users: users,
    });
  }

  uploadPhoto(file: File): Observable<Response> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Response>(`${environment.API_URL}/users/photo`, formData);
  }
}
