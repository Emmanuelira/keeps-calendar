import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReminderDialogComponent } from './info-reminder-dialog.component';

describe('InfoReminderDialogComponent', () => {
  let component: InfoReminderDialogComponent;
  let fixture: ComponentFixture<InfoReminderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoReminderDialogComponent],
    });
    fixture = TestBed.createComponent(InfoReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
