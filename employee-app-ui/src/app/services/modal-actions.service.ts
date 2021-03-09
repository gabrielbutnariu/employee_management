import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckInService} from './check-in.service';
import {RegisterService} from './register.service';
import {NgForm} from '@angular/forms';
import {CheckOutService} from './check-out.service';
import {DeleteService} from './delete.service';

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
    private deleteService: DeleteService
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

  }

  private checkIn(modalData: any, ngForm: NgForm): void {
    this.checkInService.onCheckIn(modalData, ngForm);

  }

  private checkOut(modalData: any, ngForm: NgForm): void {
    this.checkOutService.onCheckOut(modalData, ngForm);
  }

  private deleteEmp(modalData: any): void {
    this.deleteService.deleteEmp(modalData);
  }
  private deleteTimesheet(modalData: any): void {
    this.deleteService.deleteTimesheet(modalData);
  }
  private deleteEmployeeTimesheet(modalData: any): void {
    this.deleteService.deleteEmployeeTimesheet(modalData);
  }
}
