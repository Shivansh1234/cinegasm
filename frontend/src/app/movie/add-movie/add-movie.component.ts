import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieForm } from 'src/app/models/add-movie-form';
import { APIResponse } from 'src/app/models/api-response';
import { CustomError } from 'src/app/models/custom-error';
import { AddMovieRes, Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  constructor(
    private movieService: MovieService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }


  addMovieForm: FormGroup = this.fb.group({
    addByName: [true, Validators.required],
    movieInput: ['', Validators.required]
  });

  onAddMovie(): void {
    const addMovieFormData: AddMovieForm = this.addMovieForm.value;
    this.movieService.getMovieInfo(addMovieFormData).subscribe({
      next: (movieData: Movie) => {
        if (movieData.Response === 'True') {
          const addByName: boolean = addMovieFormData.addByName;
          if (addByName) {
            this.dialog.open(AddMovieDialogComponent, {
              data: movieData
            }).afterClosed().subscribe((data: boolean) => {
              if (data) {
                this.onAdd(movieData);
              }
            });
          } else {
            this.onAdd(movieData);
          }
        } else {
          this.snackbarService.error(`${movieData.Response}`, `Ok`);
        }
      },
      error: (err: CustomError) => {
        this.snackbarService.error(`${err.message}`, 'Ok');
      }
    });
  }

  onAdd(data: Movie): void {
    this.movieService.addMovie(data).subscribe({
      next: (data: APIResponse) => {
        this.snackbarService.success(data.message, 'Ok');
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, 'Ok')
      }
    })
  }
}
