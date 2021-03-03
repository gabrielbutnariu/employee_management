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
import {ModalComponent} from '../modal/modal.component';
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
  openLogoutModal(): void {
    const userId = 'user01';
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'logout',
      title: 'Are you sure you want to logout?',
      description: 'Pretend this is a convincing argument on why you shouldn\'t logout :)',
      actionButtonText: 'Logout',
      userId
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openDeleteProductModal(): void {
    const productId = 'prod01';
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'deleteProduct',
      title: 'Are you sure you want to delete this product?',
      description: 'If you continue, the product with ID ' + productId + ' will be deleted.',
      actionButtonText: 'Delete',
      productId
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
