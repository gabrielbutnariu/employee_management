import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const url = '/server/employees';
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
export class RegisterService {

  get registerOperationSuccessfulEvent$(): Observable<boolean> {
    return this._registerOperationSuccessfulEvent$.asObservable();
  }

  // tslint:disable-next-line:variable-name
  private _registerOperationSuccessfulEvent$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }
  onRegister(modalData: any, form: NgForm): void{
    const formData: string = JSON.stringify(form.value);
    console.log(form.value, formData);
    this.http.post(url, formData, httpOptions).subscribe(
      data => this._registerOperationSuccessfulEvent$.next(true),
      error => alert(error.error)
    );
  }
}
