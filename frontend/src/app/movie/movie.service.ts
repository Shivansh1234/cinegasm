import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieRes } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieInfo(movieData: string): Observable<Movie> {
    return this.http.get<Movie>(`http://www.omdbapi.com/?i=${movieData}&apikey=1d5460ac`).pipe(
      catchError(this.handleError)
    );
  }

  addMovie(movie: Movie): Observable<any> {
    let userToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    });

    return this.http.post(`${environment.baseURL}/movie/addMovie`, movie, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieList(sort: string, order: SortDirection, pageIndex: number, pageSize: number): Observable<MovieRes> {
    let userToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    });
    const movieUrl = `${environment.baseURL}/movie/getMovies?sort=${sort}&order=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<MovieRes>(movieUrl, { headers }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
