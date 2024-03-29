import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomError } from '../../app-models/custom-error';
import { SnackbarService } from 'src/app/app-services/snackbar.service';
import { RegisterForm } from '../../app-models/register-form';
import { SharedService } from '../shared.service';
import { RegisterRes } from 'src/app/app-models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private sharedService: SharedService, private snackbarService: SnackbarService,
    private router: Router) { }

  registerForm = this.fb.nonNullable.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onRegister(): void {
    const registerFormData: RegisterForm = this.registerForm.getRawValue();
    this.sharedService.register(registerFormData).subscribe({
      next: (registerData: RegisterRes) => {
        this.router.navigate(['common/login']);
        this.snackbarService.success(`${registerData.data.username} - ${registerData.message}`, `Ok`);
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, `${err.status}`);
      }
    });
  }
}
