import { Component, OnInit } from '@angular/core';
import { Weekday } from 'src/app/shared/enums/weekday.enum';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  keyframes,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReminderDialogComponent } from 'src/app/shared/components/reminder-dialog/reminder-dialog.component';
import { ReminderService } from 'src/app/shared/services/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('calendar', [
      state('true', style({})),
      state('false', style({})),
      transition(
        '* => *',
        animate(
          '300ms 0s ease-out',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )
      ),
    ]),
    trigger('onInit', [
      state('void', style({ opacity: 0 })),
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('700ms 0s ease-in')),
    ]),
  ],
})
export class CalendarComponent implements OnInit {
  previousDate: Date;
  date: Date = new Date();
  dates: Date[];
  calendarState = true;
  onInitState = 'ready';

  constructor(
    private dialog: MatDialog,
    private reminderService: ReminderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.displayCalendar();
  }

  displayCalendar(): void {
    const [month, year] = [this.date.getMonth(), this.date.getFullYear()];

    // Check if the new month is different
    if (
      this.previousDate?.getFullYear() !== year ||
      this.previousDate?.getMonth() !== month
    ) {
      this.calendarState = !this.calendarState;
      this.dates = [];
      let array: Date[] = [];
      let referenceDay = new Date(year, month, 1);
      const firstDayOfMonth = referenceDay.getDay();

      // If the first day of the month does not start on Sunday, render the days of the previous month
      if (firstDayOfMonth !== Weekday.SUNDAY) {
        let referencePreviousMonth = new Date(year, month, 0);
        for (let i = 0; i < firstDayOfMonth; i++) {
          array.unshift(new Date(referencePreviousMonth));
          referencePreviousMonth.setDate(referencePreviousMonth.getDate() - 1);
        }
      }

      // Fill the calendar
      while (month === referenceDay.getMonth()) {
        for (let i = 0; i < 7 && array.length < 7; i++) {
          array.push(new Date(referenceDay));
          referenceDay.setDate(referenceDay.getDate() + 1);
        }
        this.dates.push(...array);
        array = [];
      }
    }
  }

  changeDateWithScroll(event: WheelEvent): void {
    const ref = event.deltaY < 0 ? 0 : 1;
    this.changeMonth(ref);
  }

  changeDateForToday(): void {
    this.previousDate = new Date(this.date);
    this.date = new Date();
    this.displayCalendar();
  }

  changeMonth(ref: number): void {
    const month = ref ? this.date.getMonth() + 1 : this.date.getMonth() - 1;
    this.previousDate = new Date(this.date);
    this.date = new Date(this.date.getFullYear(), month, 1);
    this.displayCalendar();
  }

  changeDate(date: Date) {
    this.previousDate = new Date(this.date);
    this.date = date;
    this.displayCalendar();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      data: { date: '', time: '', description: '', color: '#2196F3' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeDate(result.date);
        const newDate = new Date(result.date);
        const [hour, minute] = [
          result.time.split(':')[0],
          result.time.split(':')[1],
        ];
        newDate.setHours(Number(hour));
        newDate.setMinutes(Number(minute));
        this.reminderService.addReminder({
          description: result.description,
          date: newDate,
          color: result.color,
        });
        this.openSnackBar(
          `Reminder created at ${newDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}`
        );
      }
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
