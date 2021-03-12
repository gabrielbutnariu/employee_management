import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IMessage} from '../models/employeeMessage';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmployeeService} from './employee.service';
import {catchError, finalize, tap} from 'rxjs/operators';
import {IEmployee} from '../models/employee';

export class MessageDataSource implements DataSource<IMessage>{
  private messageSubject = new BehaviorSubject<IMessage[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private employeeService: EmployeeService) {
  }


  disconnect(collectionViewer: CollectionViewer): void {
    this.messageSubject.complete();
    this.loadingSubject.complete();
  }

  connect(collectionViewer: CollectionViewer): Observable<IMessage[]> {
    return this.messageSubject.asObservable();
  }
  loadEmployee(pageNumber: number, pageSize: number, filterBy: string, sortOrder: string): void
  {
    this.loadingSubject.next(true);
    this.employeeService.getEmployees(pageNumber, pageSize, filterBy, sortOrder).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }

}
