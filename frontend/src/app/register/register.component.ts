import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  registerForm = this.fb.group({
    username: [''],
    password: ['']
  });

  onRegister(): void {
    this.userService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.registerForm;
  }

}
