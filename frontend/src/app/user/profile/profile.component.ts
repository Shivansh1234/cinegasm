import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  getUserData(): void {
    this.userService.getUserData().subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
