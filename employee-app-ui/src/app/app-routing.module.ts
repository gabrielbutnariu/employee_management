import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ReportsComponent} from './components/reports/reports.component';
import {RegisterComponent} from './components/modals/register/register.component';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {EmployeeComponent} from './components/employee/employee.component';

const routes: Routes = [
  {path: 'employees/:UUID', component: EmployeeComponent},
  {path: 'employees', component: EmployeesListComponent},
  {path: 'home', component: ReportsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
