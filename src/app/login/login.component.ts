import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { MyErrorStateMatcher } from 'src/app/shared/matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private router:Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  currentRoute = '';
  matcher = new MyErrorStateMatcher();
  idFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginSub?: Subscription;

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate(['/profile']);
    }

    this.currentRoute = this.router.url;
    if(this.currentRoute === '/') {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if(this.idFormControl.invalid || this.passwordFormControl.invalid) 
      return;

    let empId = this.idFormControl.value || "";
    empId = empId.toLowerCase();
    let pwd = this.passwordFormControl.value || "";

    this.loginSub = this.authService.getLoginInfo(empId,pwd).subscribe({
      next: res => {
          if(!res) this.idFormControl.setErrors({'invalid': true});
          else{
            this.userService.setLoggedInUser(res);
            this.router.navigate(['/profile']);
          }
      },
      error: () => this.idFormControl.setErrors({'invalid': true})
    });
  }

  submitFormIfEnter(event: KeyboardEvent): void {
    if(this.idFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }
    if(event.key === "Enter") {
      this.onSubmit();
    }
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }
}
