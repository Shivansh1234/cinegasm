import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  loginForm = this.fb.group({
    username: ['shivansh'],
    password: ['shivansh']
  });

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(data => {
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
