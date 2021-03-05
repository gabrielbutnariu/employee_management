import {IEmployee} from './employee';

export interface ITimesheet {
  id: number;
  checkinDate: Date;
  checkoutDate: Date;
  employee: IEmployee;
}
