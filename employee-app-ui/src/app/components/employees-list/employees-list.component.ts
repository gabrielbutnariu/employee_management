import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {DeleteComponent} from '../modals/delete/delete.component';
import {RegisterComponent} from '../modals/register/register.component';
import { MatTable } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements AfterViewInit  {
  dataSource: EmployeeService;
  employees: IEmployee[] = [];
  editableEmployee: IEmployee;
  totalElements = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  tableHeader = ['Name', 'Address', 'Actions'];
  dcBadges: string[] = ['name', 'giver', 'description'];
  expandedElement: IEmployee | null | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatFormField) filter!: MatFormField;
  @ViewChild('input') input!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<any>;
  firstPanel: boolean;
  secondPanel: boolean;
  cancelPressed: boolean;
  constructor(
    private httpClient: HttpClient,
    private deleteService: DeleteService,
    private matDialog: MatDialog) {
    this.firstPanel = true;
    this.secondPanel = false;
    this.cancelPressed = false;
    this.editableEmployee = {address: '', firstName: '', lastName: '', uuid: ''};
    this.dataSource = new EmployeeService(this.httpClient);
  }

  ngAfterViewInit(): void {
    this.populateTable();
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
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig).afterClosed().subscribe(() => this.populateTable());
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
    const modalDialog = this.matDialog.open(DeleteComponent, dialogConfig).afterClosed().subscribe(() => this.populateTable());
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

  editEmployee(employee: any): void{
    console.log('IN EDIT EMPLOYEE');

    this.firstPanel = false;
    this.secondPanel = true;
    this.cancelPressed = false;
    this.editableEmployee = employee;
  }
  cancelEdit(): void {
    console.log('IN CANCEL');
    this.firstPanel = true;
    this.secondPanel = false;
    this.editableEmployee = {address: '', firstName: '', lastName: '', uuid: ''};
    this.cancelPressed = true;

  }
  finishEdit(): void{
    console.log('IN FINISH');

    this.firstPanel = true;
    this.secondPanel = false;
    this.cancelPressed = false;
    this.editableEmployee = {address: '', firstName: '', lastName: '', uuid: ''};
    // put request
  }
}
