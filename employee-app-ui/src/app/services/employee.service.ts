import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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

  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.employeesUrl).pipe(
      tap(data => console.log('All:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getEmployee(id: number): Observable<IEmployee | undefined>{
    return this.getEmployees().pipe(map(
      (employees: IEmployee[]) => employees.find(emp => emp.id === id)
    ));
  }

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
