import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Reminder } from '../../models/reminder.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReminderService } from '../../services/reminder.service';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';

@Component({
  selector: 'app-info-reminder-dialog',
  templateUrl: './info-reminder-dialog.component.html',
  styleUrls: ['./info-reminder-dialog.component.css'],
})
export class InfoReminderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private reminderService: ReminderService,
    private dialog: MatDialog
  ) {}

  showTitle(): string {
    return this.data.overflow
      ? `${this.data.value.length} reminders`
      : this.data.value.description;
  }

  showDate(): string {
    if (this.data.overflow) {
      return this.data.value[0].date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else {
      return this.data.value.date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
    }
  }

  deleteReminder(reminder: Reminder): void {
    this.reminderService.deleteReminder(reminder);
    this.openSnackBar('The reminder was deleted');
    this.dialogRef.close();
  }

  editReminder(reminder: Reminder): void {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(23);
    today.setMinutes(59);
    if (reminder.date.getTime() > today.getTime()) {
      const [hour, minute] = [
        reminder.date.getHours(),
        reminder.date.getMinutes(),
      ];
      const newHour = String(hour).length > 1 ? hour : '0' + hour;
      const newMinute = String(minute).length > 1 ? minute : '0' + minute;
      const dialogRef = this.dialog.open(ReminderDialogComponent, {
        data: {
          date: reminder.date,
          time: `${newHour}:${newMinute}`,
          description: reminder.description,
          color: reminder.color,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const newDate = new Date(result.date);
          const [hour, minute] = [
            result.time.split(':')[0],
            result.time.split(':')[1],
          ];
          newDate.setHours(Number(hour));
          newDate.setMinutes(Number(minute));
          this.reminderService.editReminder(reminder, {
            description: result.description,
            date: newDate,
            color: result.color,
          });
          this.openSnackBar('The reminder was updated');
          this.dialogRef.close();
        }
      });
    } else {
      this.openSnackBar("Can't change past reminders");
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 2000 });
  }
}
