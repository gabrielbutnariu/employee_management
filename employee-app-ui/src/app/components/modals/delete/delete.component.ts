import {Component, Inject, OnInit} from '@angular/core';
import {RegisterService} from '../../../services/register.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalActionsService} from '../../../services/modal-actions.service';
import {ModalComponent} from '../modal/modal.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService
  ) {
    console.log(modalData);
  }

  ngOnInit(): void{ }

  actionFunction(): void {
    console.log('in action function delete');
    this.modalService.modalAction(this.modalData, new NgForm([], []));
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal(): void {
    this.dialogRef.close();
  }
}
