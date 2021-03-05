import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../../models/employee';
import {MatPaginator} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import {fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatFormField} from '@angular/material/form-field';
import {DeleteService} from '../../services/delete.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteComponent} from '../delete/delete.component';
import {RegisterComponent} from '../register/register.component';

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
  @ViewChild('input') input!: ElementRef;
  constructor(
    private httpClient: HttpClient,
    private deleteService: DeleteService,
    private matDialog: MatDialog) {
    this.dataSource = new EmployeeService(this.httpClient);
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        switchMap(() => {
          this.isLoadingResults = true;
          this.paginator.pageIndex = 0;
          return this.dataSource.getEmployees(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.input.nativeElement.value,
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
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource.getEmployees(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.input.nativeElement.value,
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
      ).subscribe();
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.paginator) {
  //     this.paginator.firstPage();
  //   }
  // }
  addColumn(): void{

  }
  onDelete(uuid: string): void{
    this.deleteService.onDelete(uuid);
  }
  openRegisterModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'register',
      actionButtonText: 'Add'
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig);
  }

  openDeleteModal(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'deleteEmp',
      firstName: row.firstName,
      lastName: row.lastName,
      uuid: row.uuid,
      actionButtonText: 'Delete'
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(DeleteComponent, dialogConfig);
  }
}
