import { Injectable } from '@angular/core';
import { MockServ1Service } from './mock-serv-1.service';
import { MockServ2Service } from './mock-serv-2.service';
import {HttpClient} from '@angular/common/http';
import {CheckInService} from './check-in.service';
import {RegisterService} from './register.service';
import {NgForm} from '@angular/forms';
import {CheckOutService} from './check-out.service';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  private urlEmployee = '/server/employees/';
  private urlTimesheet = '/server/timesheet/';
  constructor(
    private http: HttpClient,
    private checkInService: CheckInService,
    private checkOutService: CheckOutService,
    private registerService: RegisterService,
    private serv1: MockServ1Service,
    private serv2: MockServ2Service
  ) { }

  modalAction(modalData: any, form: NgForm): void {
    switch (modalData.name) {
      case 'check-out':
        this.checkOut(modalData, form);
        break;

      case 'check-in':
        this.checkIn(modalData, form);
        break;

      case 'register':
        this.register(modalData, form);
        break;

      case 'deleteEmp':
        this.deleteEmp(modalData);
        break;

      case 'deleteTimesheet':
        this.deleteTimesheet(modalData);
        break;
      default:
        break;
    }
  }

  private register(modalData: any, ngForm: NgForm): void {
    this.registerService.onRegister(modalData, ngForm);
    // Call an authentication service method to logout the user
    console.log('merge !');
  }

  private checkIn(modalData: any, ngForm: NgForm): void {
    this.checkInService.onCheckIn(modalData, ngForm);

  }

  private checkOut(modalData: any, ngForm: NgForm): void {
    this.checkOutService.onCheckOut(modalData, ngForm);
  }

  private deleteEmp(modalData: any): void {
    this.http.delete(this.urlEmployee + modalData.uuid).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  private deleteTimesheet(modalData: any): void {
    this.http.delete(this.urlTimesheet + modalData.timesheetId).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  private deleteEmployeeTimesheet(modalData: any): void {
    this.http.delete(this.urlTimesheet + 'all/' + modalData.uuid).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
