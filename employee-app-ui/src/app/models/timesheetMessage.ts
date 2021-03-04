import {ITimesheet} from './timesheet';

export interface ITimesheetMessage {
  timesheet: ITimesheet[];
  totalElements: number;
}
