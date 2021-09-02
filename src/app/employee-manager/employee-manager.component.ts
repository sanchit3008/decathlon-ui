import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { EmpidDialogComponent } from './empid-dialog/empid-dialog.component';
import { User } from '../shared/user';
import { MyErrorStateMatcher } from 'src/app/shared/matcher';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  foundUser: User = new User();
  mode = "add";
  subHeading = "";
  matcher = new MyErrorStateMatcher();
  urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\\.(jpg|jpeg|png)';
  //imgReg = /\.(jpg|jpeg|png)$/;

  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    empId: new FormControl(),
    photo: new FormControl('', [Validators.required, Validators.pattern(this.urlReg)]),
    phone: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    email: new FormControl(null, Validators.email),
    home: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    city: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    state: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    pincode: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(6)]),
    salary: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required]),
    designation: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
}); 

  constructor(
    public dialog: MatDialog, 
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.subHeading = "Adding new user";
  }

  addNew():void {
    this.userForm.reset();
    this.mode = "add";
    this.subHeading = "Adding new employee";
  }

  modify(): void {
    const dialogRef = this.dialog.open(EmpidDialogComponent, {
      width: '290px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userForm.reset();
        this.mode = "modify";
        this.subHeading = "Modifying employee";

        this.userService.getUser(result).subscribe(user => {
          this.foundUser = user;
          this.userForm.get('name')?.setValue(this.foundUser.name);
          this.userForm.get('empId')?.setValue(this.foundUser.empId);
          this.userForm.get('phone')?.setValue(this.foundUser.phone);
          this.userForm.get('email')?.setValue(this.foundUser.email);
          this.userForm.get('photo')?.setValue(this.foundUser.photo);
          this.userForm.get('home')?.setValue(this.foundUser.home);
          this.userForm.get('city')?.setValue(this.foundUser.city);
          this.userForm.get('state')?.setValue(this.foundUser.state);
          this.userForm.get('salary')?.setValue(this.foundUser.salary);
          this.userForm.get('pincode')?.setValue(this.foundUser.pincode);
          this.userForm.get('designation')?.setValue(this.foundUser.designation);
        });
      }
    });
  }

  onSubmit() {
    if(this.mode === "add") this.userService.addUser(this.userForm.value).subscribe(res => {
      if(res) this.router.navigate([`/employee/${res['response']}`]);
      else this.router.navigate([`/profile`])
    });
    else this.userService.modifyUser(this.userForm.value).subscribe(res => {
      if(res) this.router.navigate([`/employee/${this.foundUser.empId}`]);
      else this.router.navigate([`/profile`]);
    });
  }

}
