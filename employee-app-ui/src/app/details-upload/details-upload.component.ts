import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})

export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: string;
  reportsURIDownload = '/server/s3/reports/';
  constructor() {
    this.fileUpload = '';
  }

  ngOnInit(): void {
  }
}
