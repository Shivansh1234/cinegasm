import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomError } from '../../models/custom-error';
import { SnackbarService } from 'src/app/snackbar.service';
import { RegisterForm } from '../../models/register-form';
import { SharedService } from '../shared.service';
import { RegisterRes } from 'src/app/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private sharedService: SharedService, private snackbarService: SnackbarService,
    private router: Router) { }

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onRegister(): void {
    const registerFormData: RegisterForm = this.registerForm.value;
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

  ngOnInit(): void {
    this.registerForm;
  }

}
