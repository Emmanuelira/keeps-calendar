import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [CalendarComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule],
})
export class FeatureModule {}
