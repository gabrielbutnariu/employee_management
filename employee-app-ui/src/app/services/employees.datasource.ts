import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IEmployee} from '../components/employee/employee';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmployeeService} from './employee.service';
import {catchError, finalize} from 'rxjs/operators';

export class EmployeesDatasource implements DataSource<IEmployee>{
  private employeesSubject = new BehaviorSubject<IEmployee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private employeeService: EmployeeService) {
  }
  connect(collectionViewer: CollectionViewer): Observable<IEmployee[] | ReadonlyArray<IEmployee>> {
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEmployees(pageNumber: number,
                pageSize: number,
                filterBy: string,
                sortBy: string,
                sortOrder: string): void{
    this.loadingSubject.next(true);
    this.employeeService.getEmployees(
      pageNumber,
      pageSize,
      filterBy,
      sortBy,
      sortOrder).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(employees => this.employeesSubject.next(employees));
  }

}
