import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  contactPanelOpen = true;
  workPanelOpen = true;
  userDetails = new User();
  currUrl = "";

  ngOnInit(): void {  
    this.currUrl = this.router.url;
    if(this.currUrl.includes("/profile"))
      this.userDetails = this.userService.getLoggedInUser();
    else{
      let empId = this.currUrl.substring(10);
      this.userService.getUser(empId).subscribe(res => {
        if(res) this.userDetails = res;
        else this.userDetails = this.userService.getLoggedInUser();
      })
    }
  }

}
