import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../employee/employee';
import {MatPaginator} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatFormField} from '@angular/material/form-field';
import {DeleteService} from '../../services/delete.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from '../register/register.component';
import {DeleteComponent} from '../delete/delete.component';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements AfterViewInit  {
  dataSource: EmployeeService;
  employees: IEmployee[] = [];
  totalElements = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  tableHeader = ['Name', 'Address', 'Actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatFormField) filter!: MatFormField;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private deleteService: DeleteService,
    private matDialog: MatDialog) {
    this.dataSource = new EmployeeService(this.httpClient);
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource.getEmployees(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            '',
            this.sort.direction
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.totalElements = data.totalElements;

          return data.employees;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.employees = data);
  }

  openRegister(): void {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.componentInstance.name = 'register';
  }
  openDelete(uuid: string): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.name = 'delete';
  }
}
