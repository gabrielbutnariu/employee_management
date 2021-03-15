import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {ReportsComponent} from './components/reports/reports.component';
import {LoginService} from './services/login.service';
import { RegisterComponent } from './components/modals/register/register.component';
import {FormsModule} from '@angular/forms';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeleteComponent } from './components/modals/delete/delete.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CheckinModalComponent } from './components/modals/checkin-modal/checkin-modal.component';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {ModalComponent} from './components/modals/modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportsComponent,
    RegisterComponent,
    EmployeesListComponent,
    EmployeeComponent,
    DeleteComponent,
    CheckinModalComponent,
    ModalComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [
    LoginService,
    {
      provide: MatDialogRef,
      useValue: []
    }],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, DeleteComponent]
})
export class AppModule { }
