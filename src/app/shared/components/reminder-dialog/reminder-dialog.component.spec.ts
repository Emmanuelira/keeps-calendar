import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderDialogComponent } from './reminder-dialog.component';

describe('ReminderDialogComponent', () => {
  let component: ReminderDialogComponent;
  let fixture: ComponentFixture<ReminderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderDialogComponent],
    });
    fixture = TestBed.createComponent(ReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
