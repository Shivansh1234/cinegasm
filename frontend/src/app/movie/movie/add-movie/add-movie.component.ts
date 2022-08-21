import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomError } from 'src/app/models/custom-error';
import { Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  movieInput = new FormControl('tt0111161');

  onAddMovie(): void {
    const movieId: string = this.movieInput.value;
    this.movieService.getMovieInfo(movieId).subscribe({
      next: (data: Movie) => {
        if (data.Response === 'True') {
          this.movieService.addMovie(data).subscribe({
            next: (data) => {
              this.snackbarService.success(data.message, 'Ok');
            },
            error: (err: CustomError) => {
              console.log(err);
              this.snackbarService.error(err.message, 'Ok')
            }
          });
        } else {
          this.snackbarService.error(`${data.Response}`, `Ok`);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
  }

}
