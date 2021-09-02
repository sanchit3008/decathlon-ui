import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router:Router, private userService: UserService){};

  currentRoute = "..";
  isLoginPage = false;

  ngOnInit(){
    this.currentRoute = this.router.url;

    if(this.currentRoute !== "/login" && !this.userService.isUserLoggedIn()){
      this.router.navigate(['/login']);
    }

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
          if(this.currentRoute === "/login") this.isLoginPage = true;
        }
      }
    );
  }
  isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }
    
}
