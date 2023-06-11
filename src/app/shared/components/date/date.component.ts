import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Reminder } from 'src/app/shared/models/reminder.model';
import { ReminderService } from 'src/app/shared/services/reminder.service';
import { InfoReminderDialogComponent } from '../info-reminder-dialog/info-reminder-dialog.component';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  private reminderHeightPixelSize = 23;
  private headerWithWeekdayElement = 66;
  private headerWithoutWeekdayElement = 46;

  @Input() mainDate: Date;
  @Input() date: Date;
  @Input() index: number;
  reminders: Reminder[];
  subscription: Subscription;
  resizeObserver: ResizeObserver;
  overflow: boolean;

  constructor(
    private reminderService: ReminderService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateReminders(this.reminderService.getReminders());
    this.subscription = this.reminderService
      .getRemindersChanged()
      .subscribe((result) => {
        for (let d of result.dates) {
          if (this.isTheSameDay(d, this.date)) {
            this.updateReminders(result.reminders);
          }
        }
      });

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });

    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.resizeObserver.unobserve(this.elementRef.nativeElement);
    this.resizeObserver.disconnect();
  }

  isOtherMonth(date: Date): boolean {
    return date.getMonth() !== this.mainDate.getMonth() ? true : false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isTheSameDay(date, today);
  }

  updateReminders(value: Reminder[]): void {
    const reminders = value.filter(
      (r) =>
        r.date.getDate() === this.date.getDate() &&
        r.date.getMonth() === this.date.getMonth() &&
        r.date.getFullYear() === this.date.getFullYear()
    );
    this.reminders = this.sortRemindersByDate(reminders);
    this.handleResize();
  }

  openInfoDialog(overflow: boolean, reminder?: Reminder): void {
    const value = overflow ? this.reminders : reminder;
    this.dialog.open(InfoReminderDialogComponent, {
      data: { overflow: overflow, value: value },
    });
  }

  private sortRemindersByDate(reminders: Reminder[]): Reminder[] {
    return reminders.sort((a, b) => {
      const timeA = a.date.getHours() * 60 + a.date.getMinutes();
      const timeB = b.date.getHours() * 60 + b.date.getMinutes();

      if (timeA < timeB) {
        return -1;
      } else if (timeA > timeB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private isTheSameDay(dateA: Date, dateB: Date): boolean {
    if (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Check height to handle overflow
  private handleResize() {
    /*
      Fixed height of elements:
        Header with weekday element = 66px,
        Header without weekday element = 46px,
        Reminder height size = 23px 
    */
    if (this.reminders.length > 1) {
      const weekdayElement =
        this.elementRef.nativeElement.querySelector('.weekday');
      const headerSize = weekdayElement
        ? this.headerWithWeekdayElement
        : this.headerWithoutWeekdayElement;
      const totalSize = this.elementRef.nativeElement.clientHeight;
      const scrollHeight = this.reminders.length * this.reminderHeightPixelSize;

      if (scrollHeight > totalSize - headerSize) {
        this.overflow = true;
      } else {
        this.overflow = false;
      }
      this.cdr.detectChanges();
    }
  }
}
