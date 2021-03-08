import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  onRegister(modalData: any, form: NgForm): void{
    const formData: string = JSON.stringify(form.value);
    console.log(form.value, formData);
    this.http.post(url, formData, httpOptions).subscribe(
      data => console.log(data),
      error => alert(error.error)
    );
  }
}
