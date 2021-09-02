import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { User } from '../shared/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userDetails = new User();
  isHr = false;

  ngOnInit(): void {  
    this.userDetails = this.userService.getLoggedInUser();
    this.isHr = this.userService.isHr();
  }

  logout(): void {
    this.userService.logout();
    window.location.href = '/login';
  }

}
