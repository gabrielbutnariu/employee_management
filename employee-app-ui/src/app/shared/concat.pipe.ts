import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat'
})
export class ConcatPipe implements PipeTransform {

  transform(string1: string, string2: string ): string {
    return string1 + string2;
  }

}
