import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router:Router){};

  currentRoute = "..";
  isLogin = false;

  ngOnInit(){
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
          if(this.currentRoute == "/login") this.isLogin = true;
        }
      }
    );
  }
    
}
