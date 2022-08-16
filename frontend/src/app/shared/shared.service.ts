import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Register } from '../models/register';
import { RegisterForm } from '../models/register-form';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  register(registerFormData: RegisterForm): Observable<Register> {
    return this.http.post<Register>('http://localhost:8000/users/userRegister', registerFormData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
