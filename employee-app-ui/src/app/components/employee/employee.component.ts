import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatFormField} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {DeleteService} from '../../services/delete.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {RegisterComponent} from '../modals/register/register.component';
import {DeleteComponent} from '../modals/delete/delete.component';
import {ITimesheet} from '../../models/timesheet';
import { ActivatedRoute } from '@angular/router';
import {CheckinModalComponent} from '../modals/checkin-modal/checkin-modal.component';
import {MatTable} from '@angular/material/table';
import {CheckOutService} from '../../services/check-out.service';
import {CheckInService} from '../../services/check-in.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements AfterViewInit, OnInit {
  deleteOperationSuccessfulSubscription: Observable<boolean>;
  checkOutOperationSuccessfulSubscription: Observable<boolean>;
  checkInOperationSuccessfulSubscription: Observable<boolean>;
  dataSource: EmployeeService;
  employeeTimesheet: ITimesheet[] = [];
  employeeUUID: string;
  totalElements = 0;
  isCheckIn = true;
  isLoadingResults = true;
  isRateLimitReached = false;
  tableHeader = ['Check-In Date', 'Check-Out Date', 'Actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatFormField) filter!: MatFormField;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private deleteService: DeleteService,
    private checkOutService: CheckOutService,
    private checkInService: CheckInService,
    private matDialog: MatDialog) {
    this.deleteOperationSuccessfulSubscription = this.deleteService.deleteOperationSuccessfulEvent$;
    this.checkOutOperationSuccessfulSubscription = this.checkOutService.checkOutOperationSuccessfulEvent$;
    this.checkInOperationSuccessfulSubscription = this.checkInService.checkinOperationSuccessfulEvent$;
    this.employeeUUID = '';
    this.dataSource = new EmployeeService(this.httpClient);
  }

  ngOnInit(): void{
    this.employeeUUID = this.route.snapshot.url[1].path;
  }

  ngAfterViewInit(): void {
    this.deleteOperationSuccessfulSubscription.subscribe(
      isSuccessful => {
        if (isSuccessful){
          this.populateTable();
        }
      }
    );
    this.checkOutOperationSuccessfulSubscription.subscribe(
      isSuccessful => {
        if (isSuccessful){
          this.populateTable();
        }
      }
    );
    this.checkInOperationSuccessfulSubscription.subscribe(
      isSuccessful => {
        if (isSuccessful){
          this.populateTable();
        }
      }
    );
    this.populateTable();
  }

  openCheckInModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        typeName: 'checkinDate',
        name: 'check-in',
        uuid: this.employeeUUID,
        actionButtonText: 'Add'
      };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CheckinModalComponent, dialogConfig);
  }
  openCheckOutModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        typeName: 'checkoutDate',
        name: 'check-out',
        uuid: this.employeeUUID,
        actionButtonText: 'Add'
      };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CheckinModalComponent, dialogConfig);
  }

  openDeleteModal(row: any): void {
    console.log('delete row timesheet' + JSON.stringify(row));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'deleteTimesheet',
      timesheetId: row.id,
      uuid: row.employeeDTO.uuid,
      actionButtonText: 'Delete'
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(DeleteComponent, dialogConfig);
  }


  private populateTable(): void {
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
      ).subscribe(data => {this.employeeTimesheet = data;
                           this.table.renderRows(); });
  }
}
