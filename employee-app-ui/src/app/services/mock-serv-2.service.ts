import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockServ2Service {

  constructor() { }
  alertDelete(modalData: any): void {
    alert('Product with ID ' + modalData.productId + ' has been deleted.');
  }
}
