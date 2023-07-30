import { Component, OnInit } from '@angular/core';
import { CustomError } from 'src/app/app-models/custom-error';
import { User, UserRes } from 'src/app/user/user';
import { SnackbarService } from 'src/app/app-services/snackbar.service';
import { UserService } from '../user.service';
import { Observable, map, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  user$: Observable<User> = new Observable<User>();

  profileForm = this.fb.nonNullable.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required]
  });

  getUserData(): void {
    this.user$ = this.userService.getUserDataRequest()
      .pipe(
        map(userres => userres.data),
        tap(user => this.profileForm.patchValue(user))
      );
  }

  onUpdateProfile(): void {
    const profileFormData: User = this.profileForm.getRawValue();
    this.user$ = this.userService.updateUserDataRequest(profileFormData)
      .pipe(
        map(userres => userres.data),
        tap(user => this.profileForm.patchValue({ fname: user.fname, lname: user.lname, username: user.username }))
      );
      // .subscribe({
      //   // next: (registerData: UserRes) => {
      //   //   console.log(registerData);
      //   //   // this.snackbarService.success(`${registerData.data.username} - ${registerData.message}`, `Ok`);
      //   // },
      //   // error: (err: CustomError) => {
      //   //   // this.snackbarService.error(err.message, `${err.status}`);
      //   // }
      // });
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
