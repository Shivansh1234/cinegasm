import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/users/userLogin', data);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  storeUserData(token: string) {
    localStorage.setItem('token', token);
  }

}
