import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from './register-form';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(registerFormData: RegisterForm) {
    return this.http.post('http://localhost:8000/users/userRegister', registerFormData);
  }
}
