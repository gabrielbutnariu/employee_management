import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IEmployee} from '../components/employee/employee';
import {catchError, map, tap} from 'rxjs/operators';
import {IMessage} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // instead of search the employee in the list, adding a get request for a specific employee
  private employeesUrl = '/server/employees';
  constructor(private http: HttpClient) { }

  getEmployees(pageNumber: number,
               pageSize: number,
               filterBy: string,
               sortOrder: string): Observable<IMessage>{
    const sortParam = ['lastName', sortOrder];
    const options = {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString())
        .append('sort', sortParam.join(','))};
       // .set('filter', filterBy)};
    console.log(options);
    return this.http.get<IMessage>(this.employeesUrl, options).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
  }

}
