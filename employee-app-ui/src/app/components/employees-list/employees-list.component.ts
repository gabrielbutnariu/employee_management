import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../employee/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements AfterViewInit  {
  pageTitle = 'Employees List';
  errorMessage = '';
  listFilterKey = '';
  employees: IEmployee[] = [];
  dataSource: MatTableDataSource<IEmployee>;
  filteredEmployees: IEmployee[] = [];
  tableHeader = ['Name', 'Address', 'Timesheet', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private employeeService: EmployeeService) {
    this.dataSource = new MatTableDataSource<IEmployee>([]);
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        console.log('inainte this.' + JSON.stringify(employees));
        this.dataSource = new MatTableDataSource<IEmployee>(employees);
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        console.log('dupa this.' + JSON.stringify(employees));
        this.filteredEmployees = this.employees;
      },
      error: err => this.errorMessage = err
    });
    this.listFilter = '';
  }
  ngAfterViewInit(): void {
    // @ts-ignore
    console.log(this.dataSource);
  }

  get listFilter(): string{
    return this.listFilterKey;
  }
  set listFilter(value: string){
    this.listFilterKey = value;
    this.filteredEmployees = this.listFilter ? this.perfomFilter(this.listFilter) : this.employees;
  }

  private perfomFilter(filterBy: string): IEmployee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: IEmployee) =>
    employee.firstName.concat(' ' + employee.lastName).toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  public doFilter = (value: EventTarget) => {
    console.log('value: ' + value);
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
}
