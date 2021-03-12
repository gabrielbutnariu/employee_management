import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const url = '/server/timesheet/';
const headerDict = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const httpOptions = {
  headers: new HttpHeaders(headerDict),
};
@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  get checkOutOperationSuccessfulEvent$(): Observable<boolean> {
    return this._checkOutOperationSuccessfulEvent$.asObservable();
  }
  // tslint:disable-next-line:variable-name
  private _checkOutOperationSuccessfulEvent$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
  }

  onCheckOut(modalData: any, form: NgForm): void{
    const formData: string = JSON.stringify(form.value);
    console.log(form.value, formData);
    this.http.put(url + modalData.uuid + '/checkout', formData, httpOptions).subscribe(
      data => this._checkOutOperationSuccessfulEvent$.next(true),
      error => alert(error.error)
    );
  }
}
