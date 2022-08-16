import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomError } from 'src/app/custom-error';
import { SnackbarService } from 'src/app/snackbar.service';
import { RegisterForm } from '../../register-form';
import { SharedService } from '../shared.service';

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
      next: (data: any) => {
        console.log(data);
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
