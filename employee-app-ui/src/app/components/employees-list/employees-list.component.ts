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
  dataSource = new MatTableDataSource<IEmployee>();
  filteredEmployees: IEmployee[] = [];
  tableHeader = ['Name', 'Address', 'Actions'];
  @ViewChild(MatPaginator) paginator?: MatPaginator ;
  constructor(private employeeService: EmployeeService) {
    this.listFilter = '';
  }

  get listFilter(): string{
    return this.listFilterKey;
  }
  set listFilter(value: string){
    this.listFilterKey = value;
    this.filteredEmployees = this.listFilter ? this.perfomFilter(this.listFilter) : this.employees;
  }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        console.log('inainte this.' + JSON.stringify(employees));
        this.employees = employees;
        console.log('dupa this.' + JSON.stringify(employees));
        this.filteredEmployees = this.employees;
    },
      error: err => this.errorMessage = err
    });
  }

  private perfomFilter(filterBy: string): IEmployee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: IEmployee) =>
    employee.firstName.concat(' ' + employee.lastName).toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngAfterViewInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        console.log('inainte this.' + JSON.stringify(employees));
        this.employees = employees;
        console.log('dupa this.' + JSON.stringify(employees));
        this.filteredEmployees = this.employees;
      },
      error: err => this.errorMessage = err
    });
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
}
