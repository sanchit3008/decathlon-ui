import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.css']
})
export class DateDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { };

  range = new FormGroup({
    start: new FormControl(Validators.required),
    end: new FormControl(Validators.required)
  });

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSelectedRange() {
    return {
      start: this.range.get('start')?.value,
      end: this.range.get('end')?.value
    };
  }

}
