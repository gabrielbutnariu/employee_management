import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private deleteUrl = '/server/employees/';
  constructor(private http: HttpClient) { }

  onDelete(): Observable<{}> {
    // TODO how to tranfer uuid from employee list to delete component
    return this.http.delete(this.deleteUrl)
      .pipe(
        catchError(err => this.handleError(err))
      );
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
