import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckInService} from './check-in.service';
import {CheckOutService} from './check-out.service';
import {RegisterService} from './register.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private urlEmployee = '/server/employees/';
  private urlTimesheet = '/server/timesheet/';

  // tslint:disable-next-line:variable-name
  private _deleteOperationSuccessfulEvent$: Subject<boolean> = new Subject();

  get deleteOperationSuccessfulEvent$(): Observable<boolean> {
    return this._deleteOperationSuccessfulEvent$.asObservable();
  }
  constructor(private http: HttpClient) { }

   deleteEmp(modalData: any): void {
    this.http.delete(this.urlEmployee + modalData.uuid).subscribe(
      data => this._deleteOperationSuccessfulEvent$.next(true),
      error => alert(error.error)
    );
  }
   deleteTimesheet(modalData: any): void {
    this.http.delete(this.urlTimesheet + modalData.timesheetId).subscribe(
      data => this._deleteOperationSuccessfulEvent$.next(true),
      error => alert(error.error)
    );
  }
  deleteEmployeeTimesheet(modalData: any): void {
    this.http.delete(this.urlTimesheet + 'all/' + modalData.uuid).subscribe(
      data => this._deleteOperationSuccessfulEvent$.next(true),
      error => alert(error)
    );
  }
}
