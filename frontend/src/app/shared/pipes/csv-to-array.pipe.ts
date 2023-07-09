import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'csvToArray'
})
export class CsvToArrayPipe implements PipeTransform {

  transform(csvString: string): string[] {
    return csvString.split(',');
  }

}
