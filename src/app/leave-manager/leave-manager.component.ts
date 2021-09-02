import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DateDialogComponent } from './date-dialog/date-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LeaveService } from '../services/leave-service';
import { User } from '../shared/user';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-manager',
  templateUrl: './leave-manager.component.html',
  styleUrls: ['./leave-manager.component.css']
})
export class LeaveManagerComponent implements OnInit, OnDestroy {

  constructor(
    public dialog: MatDialog, 
    private userService: UserService,
    private leaveService: LeaveService,
    private router: Router) { }

  displayDatepicker = false;
  userDetails = new User();
  isHr = false;
  leaveSub?: Subscription;

  ngOnInit() {
    this.userDetails = this.userService.getLoggedInUser();
    this.isHr = JSON.parse(sessionStorage.getItem('isHr') || "false");
  }

  ngOnDestroy(){
    this.leaveSub?.unsubscribe();
  }

  leaveBtnClick() {
    const dialogRef = this.dialog.open(DateDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.leaveService.postNewLeave(this.userDetails.empId || '', result.start, result.end)
          .subscribe(() => {
            window.location.reload();
          });
      }
    });
  }
  
}