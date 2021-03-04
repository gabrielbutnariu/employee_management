// import { Component, OnInit } from '@angular/core';
// import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
// import {RegisterComponent} from '../register/register.component';
//
//
// const ngbModalOptions: NgbModalOptions = {
//   // backdrop : false
// };
// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css']
// })
//
// export class ModalComponent implements OnInit {
//   constructor(private modalService: NgbModal) {}
//   open(): void {
//     const modalRef = this.modalService.open(RegisterComponent, ngbModalOptions);
//     modalRef.componentInstance.name = 'employees-list';
//   }
//   ngOnInit(): void {
//   }
// }
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModalActionsService} from 'src/app/services/modal-actions.service';
// import { ModalActionsService } from 'src/app/services/modal-actions.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService
  ) {
    console.log(modalData);
  }

  ngOnInit(): void{ }

  // When the user clicks the action button, the modal calls the service\
  // responsible for executing the action for this modal (depending on\
  // the name passed to `modalData`). After that, it closes the modal
  actionFunction(): void {
    this.modalService.modalAction(this.modalData);
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal(): void {
    this.dialogRef.close();
  }

}
