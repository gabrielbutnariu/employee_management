import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from '../register/register.component';


const ngbModalOptions: NgbModalOptions = {
  // backdrop : false
};
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  open(): void {
    const modalRef = this.modalService.open(RegisterComponent, ngbModalOptions);
    modalRef.componentInstance.name = 'employees-list';
  }
  ngOnInit(): void {
  }
}
