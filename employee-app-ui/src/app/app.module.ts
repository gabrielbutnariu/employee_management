import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {LoginService} from './services/login.service';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ConcatPipe } from './shared/concat.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeleteComponent } from './components/delete/delete.component';
import {NgbModalOptions, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CheckinModalComponent } from './components/checkin-modal/checkin-modal.component';
import { TimestampToReadableTimePipe } from './shared/timestamp-to-readable-time.pipe';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/en';
import {ModalComponent} from './components/modal/modal.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EmployeesListComponent,
    EmployeeComponent,
    ConcatPipe,
    DeleteComponent,
    CheckinModalComponent,
    TimestampToReadableTimePipe,
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
    MatButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US'},
    LoginService,
    {
      provide: MatDialogRef,
      useValue: []
    }],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, DeleteComponent]
})
export class AppModule { }
