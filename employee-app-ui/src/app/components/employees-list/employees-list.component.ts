import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../employee/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {EmployeesDatasource} from '../../services/employees.datasource';
import {tap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, AfterViewInit  {
  employee?: IEmployee;
  dataSource: EmployeesDatasource;
  // pageTitle = 'Employees List';
  // errorMessage = '';
  // listFilterKey = '';
  // employees: IEmployee[] = [];
  // dataSource: MatTableDataSource<IEmployee>;
  // filteredEmployees: IEmployee[] = [];
   tableHeader = ['Name', 'Address', 'Actions'];
   @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private employeeService: EmployeeService) {
     this.dataSource = new EmployeesDatasource(this.employeeService);
    // this.employeeService.getEmployees(0, 5, 'firstName', 'firstName', 'asc').subscribe({
    //   next: employees => {
    //     console.log('inainte this.' + JSON.stringify(employees));
    //     this.dataSource = new MatTableDataSource<IEmployee>(employees);
    //     // @ts-ignore
    //     this.dataSource.paginator = this.paginator;
    //     console.log('dupa this.' + JSON.stringify(employees));
    //     this.filteredEmployees = this.employees;
    //   },
    //   error: err => this.errorMessage = err
    // });
    // this.listFilter = '';
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
    }

  ngOnInit(): void {
    this.dataSource.loadEmployees(
      0,
      5,
      'firstName',
      'firstName',
      'asc');
  }
  loadLessonsPage(): void {
    this.dataSource.loadEmployees(0, 5, 'firstName', 'firstName', 'asc');
  }
  // get listFilter(): string{
  //   return this.listFilterKey;
  // }
  // set listFilter(value: string){
  //   this.listFilterKey = value;
  //   this.filteredEmployees = this.listFilter ? this.perfomFilter(this.listFilter) : this.employees;
  // }
  //
  // private perfomFilter(filterBy: string): IEmployee[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.employees.filter((employee: IEmployee) =>
  //   employee.firstName.concat(' ' + employee.lastName).toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }
  //
  //
  // public doFilter = (value: EventTarget) => {
  //   console.log('value: ' + value);
  //   // this.dataSource.filter = value.trim().toLocaleLowerCase();
  //   }
}
