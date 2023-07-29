import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/custom-error';
import { AuthService } from '../../app-services/auth.service';
import { SnackbarService } from 'src/app/app-services/snackbar.service';
import { LoginForm } from 'src/app/models/login-form';
import { LoginRes } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private snackbarService: SnackbarService) { }

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin(): void {
    const loginFormData: LoginForm = this.loginForm.getRawValue();

    this.authService.loginRequest(loginFormData).subscribe({
      next: (loginData: LoginRes) => {
        this.authService.storeUserData(loginData.data.token as string);
        if (localStorage.getItem('token')) {
          this.router.navigate(['movie']);
        } else {
          this.snackbarService.error(`Authentication Failed`, `Ok`);
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
