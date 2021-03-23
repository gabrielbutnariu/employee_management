import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../../models/employee';
import {MatPaginator} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import {fromEvent, merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatFormField} from '@angular/material/form-field';
import {DeleteService} from '../../services/delete.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteComponent} from '../modals/delete/delete.component';
import {RegisterComponent} from '../modals/register/register.component';
import { MatTable } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MessageDataSource} from '../../services/MessageDataSource.datasource';
import {RegisterService} from '../../services/register.service';
import {IEditableEmployee} from '../../models/editableEmployee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements AfterViewInit  {
  constructor(
    private httpClient: HttpClient,
    private employeeService: EmployeeService,
    private deleteService: DeleteService,
    private registerService: RegisterService,
    private matDialog: MatDialog) {
    this.registerOperationSuccessfulSubscription = this.registerService.registerOperationSuccessfulEvent$;
    this.deleteOperationSuccessfulSubscription = this.deleteService.deleteOperationSuccessfulEvent$;
    this.firstPanel = true;
    this.secondPanel = false;
    this.cancelPressed = false;
    this.editableEmployee = {address: '', firstName: '', lastName: '', ssn: '', uuid: ''};
    this.dataSource = new EmployeeService(this.httpClient);

  }
  // dataSource: MessageDataSource;
  registerOperationSuccessfulSubscription: Observable<boolean>;
  deleteOperationSuccessfulSubscription: Observable<boolean>;
  dataSource: EmployeeService;
  employees: IEmployee[] = [];
  editableEmployee: IEditableEmployee;
  totalElements = 9;
  isLoadingResults = true;
  isRateLimitReached = false;
  tableHeader = ['Name', 'Address', 'Actions'];
  dcBadges: string[] = ['name', 'giver', 'description'];
  expandedElement: IEmployee | null | undefined;
  projectEditForm: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatFormField) filter!: MatFormField;
  @ViewChild('input') input!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('matTabGroup', { static: false }) matTabGroup!: MatTabGroup;
  firstPanel: boolean;
  secondPanel: boolean;
  cancelPressed: boolean;

  // loadEmployee(): void{
  //   console.log('Load emp');
  //   this.dataSource.(
  //     this.paginator.pageIndex,
  //     this.paginator.pageSize,
  //     this.input.nativeElement.value,
  //     this.sort.direction
  //   );
  // }
  registerForm: any;


  ngAfterViewInit(): void {
    this.registerOperationSuccessfulSubscription.subscribe(
      isSuccessful => {
        if (isSuccessful){
          this.populateTable();
        }
      }
    );
    this.deleteOperationSuccessfulSubscription.subscribe(
      isSuccessful => {
        if (isSuccessful){
          this.populateTable();
        }
      }
    );
    this.populateTable();
    this.validateForm();
  }

  populateTable(): void{
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.input.nativeElement, 'keyup'))
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
      ).subscribe(data => {this.employees = data;
                           this.table.renderRows(); });
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

  onSubmit(form: NgForm): void {
    if (!this.cancelPressed){
      console.log('IN SUBMIT');
      console.log('form from edit: ' + JSON.stringify(form.value));
      this.dataSource.updateEmployee(form.value, this.editableEmployee.uuid)
        .subscribe(() => this.populateTable(),
            error => alert(error.error));
      this.finishEdit();
    }
  }
  validateForm(): void{

  }
  openSecondPanel(): void{
    this.firstPanel = false;
    this.secondPanel = true;
  }
  openFirstPanel(): void{
    this.firstPanel = true;
    this.secondPanel = false;
  }
  editEmployee(uuid: string): void{
    console.log('IN EDIT EMPLOYEE');
    this.matTabGroup.selectedIndex = 0;
    this.openSecondPanel();
    this.cancelPressed = false;
    this.employeeService.getEditableEmployee(uuid).subscribe(data => this.editableEmployee = data);
  }
  cancelEdit(): void {
    console.log('IN CANCEL');
    this.openFirstPanel();
    this.editableEmployee = {ssn: '', address: '', firstName: '', lastName: '', uuid: ''};
    this.cancelPressed = true;

  }
  finishEdit(): void{
    console.log('IN FINISH');
    this.openFirstPanel();
    this.cancelPressed = false;
    this.editableEmployee = {ssn: '', address: '', firstName: '', lastName: '', uuid: ''};
    // put request
  }
}
