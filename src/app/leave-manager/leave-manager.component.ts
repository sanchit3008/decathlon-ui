import { Component, OnInit, Inject } from '@angular/core';
import { DateDialogComponent } from './date-dialog/date-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-manager',
  templateUrl: './leave-manager.component.html',
  styleUrls: ['./leave-manager.component.css']
})
export class LeaveManagerComponent {

  constructor(public dialog: MatDialog) { }

  displayDatepicker= false;

  leaveBtnClick() {
    const dialogRef = this.dialog.open(DateDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
}