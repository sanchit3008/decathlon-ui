import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { User } from '../shared/user';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }
  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(res => {if(res) this.users = res; console.log(res)});
  }

}
