import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LeaveService } from 'src/app/services/leave-service';
import { UserService } from 'src/app/services/user-service';
import { Leaves } from 'src/app/shared/leaves';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements AfterViewInit, OnDestroy  {

  displayedColumns: string[] = ['From', 'To', 'Status'];
  displayedColumnsForHr = ['Employee ID', 'From', 'To', 'Actions']
  dataSource: MatTableDataSource<Leaves> = new MatTableDataSource<Leaves>();
  leaveSub?: Subscription;
  userDetails = new User();
  isHr = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private leaveService: LeaveService, private userService: UserService) {
    this.userDetails = this.userService.getLoggedInUser();
    this.isHr = this.userService.isHr();
    if(!this.isHr){
      this.leaveSub = this.leaveService.getLeavesForEmployee(this.userDetails.empId || '')
      .subscribe(res => {
        this.dataSource.data = res;
      });
    }
    else{
      this.displayedColumns = this.displayedColumnsForHr;
      this.leaveSub = this.leaveService.getPendingLeaves()
        .subscribe(res => {
          this.dataSource.data = res;
        });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.leaveSub?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveBtnClick(leaveId: any) {
    this.leaveService.modifyLeave(leaveId, "Approved").subscribe(() => window.location.reload());
  }

  rejectBtnClick(leaveId: any) {
    this.leaveService.modifyLeave(leaveId, "Rejected").subscribe(() => window.location.reload());
  }
}