import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IMessage} from '../models/employeeMessage';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmployeeService} from './employee.service';
import {catchError, finalize} from 'rxjs/operators';
import {IEmployee} from '../models/employee';

export class MessageDataSource implements DataSource<IEmployee>{
  private messagesSubject = new BehaviorSubject<IEmployee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private employeeService: EmployeeService) {}

  connect(collectionViewer: CollectionViewer): Observable<IEmployee[] | ReadonlyArray<IEmployee>> {
    return this.messagesSubject.asObservable();
  }


  disconnect(collectionViewer: CollectionViewer): void {
    this.messagesSubject.complete();
    this.loadingSubject.complete();
  }

  loadMessage(pageNumber: number, pageSize: number, filterBy: string, sortBy: string, sortOrder: string): void{
    this.loadingSubject.next(true);

    this.employeeService.getEmployees(pageNumber, pageSize, filterBy, sortBy, sortOrder)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
        // @ts-ignore
      ).subscribe(message => this.messagesSubject.next(message));
  }
}
