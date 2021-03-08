import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {IMessage} from '../models/employeeMessage';
import {ITimesheetMessage} from '../models/timesheetMessage';
import {IEmployee} from '../models/employee';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // instead of search the employee in the list, adding a get request for a specific employee
  private employeesUrl = '/server/employees';
  private timesheetUrl = '/server/timesheet/';

  constructor(private http: HttpClient) {}


  getEmployees(pageNumber: number,
               pageSize: number,
               filterBy: string,
               sortOrder: string): Observable<IMessage>{

    const sortParam = ['lastName', sortOrder];

    const options = {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString())
        .append('sort', sortParam.join(','))
        .set('filter', filterBy)};
    console.log(options);

    return this.http.get<IMessage>(this.employeesUrl, options); // .pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data)))
    // );
  }

  getEmployeeTimesheet(uuid: string,
                       pageNumber: number,
                       pageSize: number,
                       sortOrder: string): Observable<ITimesheetMessage>{

    const sortParam = ['checkinDate', sortOrder];

    const options = {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString())
        .append('sort', sortParam.join(','))
        .set('uuid', uuid)};
    console.log(options);

    return this.http.get<ITimesheetMessage>(this.timesheetUrl + uuid, options); // .pipe(
      // tap(data => console.log('All timesheets: ' + this.timesheetUrl + uuid))
    // );
  }
  updateEmployee(formData: NgForm, uuid: string): Observable<any> {
    console.log('formData: ' + JSON.stringify(formData));
    console.log('url: ' + this.employeesUrl + '/' + uuid);
    return this.http.put<IEmployee>(this.employeesUrl + '/' + uuid, formData);
  }
  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
