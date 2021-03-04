import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {ModalActionsService} from '../../services/modal-actions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
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
  onRegister(form: NgForm): void {
    this.registerService.onRegister(form);
    this.modalService.modalAction(this.modalData);
    this.router.navigate(['/employees']);
    this.closeModal();
  }
}
