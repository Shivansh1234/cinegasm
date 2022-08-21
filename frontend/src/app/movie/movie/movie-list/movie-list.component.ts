import { Component, OnInit } from '@angular/core';
import { CustomError } from 'src/app/models/custom-error';
import { Movie, MovieRes } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  movies: Movie[] = [];

  getMovies(): void {
    this.movieService.getMovieList().subscribe({
      next: (movieListData: MovieRes) => {
        this.movies = movieListData.data;
      },
      error: (err: CustomError) => {
        console.log(err);
        this.snackbarService.error(`${err.message}`, `${err.status}`);
      }
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
