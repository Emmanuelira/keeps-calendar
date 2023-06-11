import { Pipe, PipeTransform } from '@angular/core';
import { Reminder } from '../models/reminder.model';

@Pipe({
  name: 'reminder',
})
export class ReminderPipe implements PipeTransform {
  transform(reminder: Reminder): string {
    const [hour, minute] = [
      reminder.date.getHours(),
      reminder.date.getMinutes(),
    ];
    const newMinute = String(minute).length > 1 ? minute : '0' + minute;
    return `${hour}:${newMinute}`;
  }
}
