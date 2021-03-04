import { Injectable } from '@angular/core';
import { MockServ1Service } from './mock-serv-1.service';
import { MockServ2Service } from './mock-serv-2.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  private url = '/server/employees/';
  constructor(
    private http: HttpClient,
    private serv1: MockServ1Service,
    private serv2: MockServ2Service
  ) { }

  // This function is the only way this service is directly called in the modal.
  // The modal passes to it the received `data` object and then this function\
  // calls the appropriate function based on the name of the modal. Then, that\
  // function receives whatever values it needs that were included in `data`
  modalAction(modalData: any): void {
    switch (modalData.name) {
      case 'register':
        this.register(modalData);
        break;

      case 'delete':
        this.delete(modalData);
        break;

      default:
        break;
    }
  }

  // While the following functions don't make sense in this demo, I've created\
  // them for the sake of mentioning scenearios where the values from data\
  // couldn't be passed directly to the other service calls

  private register(modalData: any): void {
    // Call an authentication service method to logout the user
    console.log('merge !');
  }

  private delete(modalData: any): void {
    this.http.delete(this.url + modalData.uuid).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}