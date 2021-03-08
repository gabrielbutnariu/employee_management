import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalActionsService} from '../../../services/modal-actions.service';
import {RegisterService} from '../../../services/register.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';
import {CheckInService} from '../../../services/check-in.service';

@Component({
  selector: 'app-checkin-modal',
  templateUrl: './checkin-modal.component.html',
  styleUrls: ['./checkin-modal.component.css']
})
export class CheckinModalComponent implements OnInit {

  constructor(
    private checkInService: CheckInService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService
  ) {
    console.log(modalData);
  }

  ngOnInit(): void{ }

  closeModal(): void {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm): void {
    console.log('form: ' + form.value.checkinDate);
    // this.checkInService.onRegister(form, this.modalData);
    this.modalService.modalAction(this.modalData, form);
    this.router.navigate(['/employees/' + this.modalData.uuid]);
    this.closeModal();
  }
}
