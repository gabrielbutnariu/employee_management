import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reportsURI = '/server/s3/reports/all';
  constructor(private http: HttpClient) { }

  getFiles(): Observable<any> {
    return this.http.get(this.reportsURI);
}
}
