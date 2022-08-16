import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/custom-error';
import { AuthService } from '../../auth.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { LoginForm } from '../../login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private snackbarService: SnackbarService) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin(): void {
    const loginFormData: LoginForm = this.loginForm.value;

    this.authService.login(loginFormData).subscribe({
      next: (data: any) => {
        this.authService.storeUserData(data.data.token as string);
        if (localStorage.getItem('token')) {
          console.log(data);
          this.router.navigate(['user/profile']);
        } else {
          console.log('please authenticate first');
        }
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, `${err.status}`);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm;
  }

}
