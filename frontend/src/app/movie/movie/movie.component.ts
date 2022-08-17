import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  movieInput = new FormControl('');

  onAddMovie(): void {
    const movieId: string = this.movieInput.value;
    this.movieService.getMovieInfo(movieId).subscribe({
      next: (data: Movie) => {
        if (data.Response === 'True') {
          console.log(data);
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
