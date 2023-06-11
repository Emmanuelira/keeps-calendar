import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reminder } from '../../models/reminder.model';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css'],
})
export class ReminderDialogComponent implements OnInit {
  today: Date;
  initialFormValues: any;
  colors: string[] = [
    '#333333',
    '#FF4081',
    '#F44336',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#4CAF50',
    '#8BC34A',
    '#FFC107',
  ];

  constructor(
    public dialogRef: MatDialogRef<ReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.initialFormValues = { ...this.data };
  }

  onNoClick(): void {
    if (!isEqual(this.data, this.initialFormValues)) {
      const confirmClose = window.confirm('Discard unsaved changes?');
      if (confirmClose) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }
}
