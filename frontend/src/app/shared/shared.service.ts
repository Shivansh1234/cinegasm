import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRes } from '../app-models/register';
import { RegisterForm } from '../app-models/register-form';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  register(registerFormData: RegisterForm): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(`${environment.baseURL}/users/userRegister`, registerFormData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
