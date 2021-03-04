import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatFormField} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {DeleteService} from '../../services/delete.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {RegisterComponent} from '../register/register.component';
import {DeleteComponent} from '../delete/delete.component';
import {ITimesheet} from '../../models/timesheet';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements AfterViewInit, OnInit {
  dataSource: EmployeeService;
  employeeTimesheet: ITimesheet[] = [];
  employeeUUID = '';
  totalElements = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  tableHeader = ['Check-In Date', 'Check-Out Date', 'Actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatFormField) filter!: MatFormField;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private deleteService: DeleteService,
    private matDialog: MatDialog) {
    this.dataSource = new EmployeeService(this.httpClient);
  }
  ngOnInit(): void{
    this.employeeUUID = this.route.snapshot.params.uuid;
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource.getEmployeeTimesheet(
            this.employeeUUID,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.totalElements = data.totalElements;

          return data.timesheet;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.employeeTimesheet = data);
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
      name: 'delete',
      firstName: row.firstName,
      lastName: row.lastName,
      uuid: row.uuid,
      actionButtonText: 'Delete'
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(DeleteComponent, dialogConfig);
  }
}
