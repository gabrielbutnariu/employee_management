import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {IEmployee} from '../employee/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  pageTitle = 'Employees List';
  errorMessage = '';
  listFilterKey = '';
  employees: IEmployee[] = [];
  filteredEmployees: IEmployee[] = [];

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
    employee.employeeFirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
