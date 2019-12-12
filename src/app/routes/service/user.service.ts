import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private url = '/api/sap/users';

  constructor(private http: _HttpClient) {}

  findAllUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  resetPassword(userCode: string): Observable<any> {
    return this.http.put(this.url + '/' + userCode + '/reset');
  }
}
