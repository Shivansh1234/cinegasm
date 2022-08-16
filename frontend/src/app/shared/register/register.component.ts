import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomError } from '../../models/custom-error';
import { SnackbarService } from 'src/app/snackbar.service';
import { RegisterForm } from '../../models/register-form';
import { SharedService } from '../shared.service';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private sharedService: SharedService, private snackbarService: SnackbarService) { }

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onRegister(): void {
    const registerFormData: RegisterForm = this.registerForm.value;
    this.sharedService.register(registerFormData).subscribe({
      next: (data: Register) => {
        this.snackbarService.success(`${data.data.username} - ${data.message}`, `Ok`);
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
