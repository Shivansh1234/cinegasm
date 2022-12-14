import { Component, OnInit } from '@angular/core';
import { CustomError } from 'src/app/models/custom-error';
import { User, UserData } from 'src/app/models/user';
import { SnackbarService } from 'src/app/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private snackbarService: SnackbarService) { }

  user: UserData = {
    username: ''
  };

  getUserData(): void {
    this.userService.getUserData().subscribe({
      next: (userData: User) => {
        this.user = userData.data;
      },
      error: (err: CustomError) => {
        this.snackbarService.error(`${err.message}`, `${err.status}`);
      }
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
