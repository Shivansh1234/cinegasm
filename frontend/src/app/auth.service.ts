import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { LoginForm } from './login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(loginFormData: LoginForm): Observable<any> {
    return this.http.post('http://localhost:8000/users/userLogin', loginFormData).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    this.router.navigate(['common/login']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  storeUserData(token: string) {
    localStorage.setItem('token', token);
    this.isLogin$.next(true);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }

}
