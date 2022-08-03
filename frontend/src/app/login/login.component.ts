import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginForm } from '../login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin(): void {
    const loginFormData: LoginForm = this.loginForm.value;
    this.authService.login(loginFormData).subscribe(data => {
      this.authService.storeUserData(data.token as string);
      if (localStorage.getItem('token')) {
        this.router.navigate(['/profile']);
      } else {
        console.log('please authenticate first');
      }
    });
  }

  ngOnInit(): void {
    this.loginForm;
  }

}
