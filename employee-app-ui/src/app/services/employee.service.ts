import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IEmployee} from '../components/employee/employee';
import {catchError, map, tap} from 'rxjs/operators';

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
               sortBy: string,
               sortOrder: string): Observable<IEmployee[]>{
    const sortParam = [sortBy, sortOrder];
    const options = {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString())
        .append('sort', sortParam.join(','))};
       // .set('filter', filterBy)};
    console.log(options);
    return this.http.get<IEmployee[]>(this.employeesUrl, options).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
  }

  // getEmployee(id: string): Observable<IEmployee | undefined>{
  //   return this.getEmployees().pipe(map(
  //     (employees: IEmployee[]) => employees.find(emp => emp.uuid === id)
  //   ));
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);

  }
}
