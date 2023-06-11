import { Pipe, PipeTransform } from '@angular/core';
import { Weekday } from '../enums/weekday.enum';

@Pipe({
  name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {
  transform(value: number): string {
    let result = '';
    switch (value) {
      case Weekday.SUNDAY:
        result = 'SUN';
        break;
      case Weekday.MONDAY:
        result = 'MON';
        break;
      case Weekday.TUESDAY:
        result = 'TUE';
        break;
      case Weekday.WEDNESDAY:
        result = 'WED';
        break;
      case Weekday.THURSDAY:
        result = 'THU';
        break;
      case Weekday.FRIDAY:
        result = 'FRI';
        break;
      case Weekday.SATURDAY:
        result = 'SAT';
        break;
    }
    return result;
  }
}
