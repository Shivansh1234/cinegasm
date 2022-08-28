import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomError } from 'src/app/models/custom-error';
import { AddMovieRes, Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent  {

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  movieRadioChoice = new FormControl(true);
  movieInput = new FormControl('tt0111161');

  onAddMovie(): void {
    const movieId: string = this.movieInput.value;
    this.movieService.getMovieInfo(movieId).subscribe({
      next: (data: Movie) => {
        if (data.Response === 'True') {
          this.onAdd(data);
        } else {
          this.snackbarService.error(`${data.Response}`, `Ok`);
        }
      },
      error: (err: CustomError) => {
        this.snackbarService.error(`${err.message}`, 'Ok');
      }
    })
  }

  onAdd(data: Movie): void {
    this.movieService.addMovie(data).subscribe({
      next: (data: AddMovieRes) => {
        this.snackbarService.success(data.message, 'Ok');
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, 'Ok')
      }
    });
  }
}
