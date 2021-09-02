import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/shared/matcher';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-empid-dialog',
  templateUrl: './empid-dialog.component.html',
  styleUrls: ['./empid-dialog.component.css']
})
export class EmpidDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmpidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
    ) { };
  
  empInput = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  count = 0;

  ngOnInit(): void {
    this.userService.getUserCount()
      .subscribe(res => {
        this.count = res['count'];
        this.empInput.setValidators([Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1), Validators.max(this.count)]);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkEmpId() {
    let currInput = this.empInput.value;
    return currInput;
  }

}
