import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable()
export class BottleneckService {
  private url = '/api/sap/bottleneck';

  constructor(private http: _HttpClient) {}

  loadUserDevices(userCode: string): Observable<any> {
    return this.http.get(this.url, { userCode });
  }
}
