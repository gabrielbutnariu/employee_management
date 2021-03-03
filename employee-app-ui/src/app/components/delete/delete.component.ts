import { Component, OnInit, Input} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DeleteService} from '../../services/delete.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() name: any;
  constructor(private deleteService: DeleteService, public activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
  }

  onDelete(): void{
    this.deleteService.onDelete();
  }
}
