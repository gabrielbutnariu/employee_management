import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ReportsService} from '../../services/reports.service';

@Component({
  templateUrl: 'reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  pageTitle = 'Employee Management';

  showFile = false;
  fileUploads: Observable<any> | undefined;

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void{
    this.showFiles();
  }

  showFiles(): void {
    this.fileUploads = this.reportsService.getFiles();
  }
}
