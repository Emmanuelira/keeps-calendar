import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WeekdayPipe } from './pipes/weekday.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { ReminderDialogComponent } from './components/reminder-dialog/reminder-dialog.component';
import { DateComponent } from './components/date/date.component';
import { MaterialModule } from './material.module';
import { ReminderPipe } from './pipes/reminder.pipe';
import { InfoReminderDialogComponent } from './components/info-reminder-dialog/info-reminder-dialog.component';

@NgModule({
  declarations: [
    WeekdayPipe,
    TitlePipe,
    ReminderPipe,
    ReminderDialogComponent,
    DateComponent,
    InfoReminderDialogComponent,
  ],
  imports: [CommonModule, FormsModule, MaterialModule],
  providers: [],
  exports: [
    WeekdayPipe,
    TitlePipe,
    ReminderDialogComponent,
    DateComponent,
    FormsModule,
    MaterialModule,
  ],
})
export class SharedModule {}
