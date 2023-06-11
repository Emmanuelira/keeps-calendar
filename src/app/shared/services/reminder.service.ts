import { Injectable } from '@angular/core';
import { reminders } from 'src/assets/mocks/reminder.mock';
import { Reminder } from '../models/reminder.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Reminder[] = reminders;
  private remindersSubject = new Subject<any>();

  getReminders(): Reminder[] {
    return this.reminders;
  }

  getRemindersChanged(): Observable<any> {
    return this.remindersSubject.asObservable();
  }

  addReminder(reminder: Reminder): void {
    this.reminders.push(reminder);
    this.remindersSubject.next({
      dates: [reminder.date],
      reminders: this.reminders,
    });
  }

  deleteReminder(reminder: Reminder): void {
    const index = this.reminders.findIndex(
      (r) => r.date.getTime() === reminder.date.getTime()
    );
    this.reminders.splice(index, 1);
    this.remindersSubject.next({
      dates: [reminder.date],
      reminders: this.reminders,
    });
  }

  editReminder(oldReminder: Reminder, newReminder: Reminder): void {
    const index = this.reminders.findIndex(
      (r) => r.date.getTime() === oldReminder.date.getTime()
    );
    this.reminders.splice(index, 1, newReminder);
    this.remindersSubject.next({
      dates: [newReminder.date, oldReminder.date],
      reminders: this.reminders,
    });
  }
}
