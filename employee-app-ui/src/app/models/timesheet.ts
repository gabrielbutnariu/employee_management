import {IEmployee} from './employee';

export interface ITimesheet {
  checkinDate: Date;
  checkoutDate: Date;
  employee: IEmployee;
}
