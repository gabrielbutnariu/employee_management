import {Inject, Injectable} from '@angular/core';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from '../components/modals/modal/modal.component';
import {ModalActionsService} from './modal-actions.service';
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
export class CheckInService {

  constructor(private http: HttpClient) { }

  onCheckIn(modalData: any, form: NgForm): void{
    const formData: string = JSON.stringify(form.value);
    console.log(form.value, formData);
    console.log('URL checkour:' + url + modalData.uuid + '/checkin');
    this.http.post(url + modalData.uuid + '/checkin', formData, httpOptions).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
