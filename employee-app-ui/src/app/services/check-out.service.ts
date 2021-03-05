import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  constructor(private http: HttpClient) {
  }

  onCheckOut(modalData: any, form: NgForm): void{
    const formData: string = JSON.stringify(form.value);
    console.log(form.value, formData);
    this.http.put(url + modalData.uuid + '/checkout', formData, httpOptions).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
