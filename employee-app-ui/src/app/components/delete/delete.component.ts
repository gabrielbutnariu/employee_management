import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private deleteService: RegisterService) { }

  ngOnInit(): void {
  }

}
