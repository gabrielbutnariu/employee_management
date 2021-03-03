import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockServ1Service {

  constructor() { }
  alertLogout(modalData: any): void {
    alert('User with ID ' + modalData.userId + ' has logged out.');
  }
}
