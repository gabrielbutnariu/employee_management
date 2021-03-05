import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToReadableTime'
})
export class TimestampToReadableTimePipe implements PipeTransform {

  transform(timestamp: string): string {
    return '';
  }

}
