import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, args: number) : string {    
    if (typeof value === 'undefined' || value === null) {
      return '-';
    }

    return value.length > args ? value.substring(0, (args-3)) + '...' : value;
  }

}
