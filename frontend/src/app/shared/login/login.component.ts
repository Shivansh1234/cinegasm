import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/custom-error';
import { AuthService } from '../../auth.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { LoginForm } from 'src/app/models/login-form';
import { Login } from 'src/app/models/login';

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
      next: (loginData: Login) => {
        this.authService.storeUserData(loginData.data.token as string);
        if (localStorage.getItem('token')) {
          this.router.navigate(['movie']);
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
