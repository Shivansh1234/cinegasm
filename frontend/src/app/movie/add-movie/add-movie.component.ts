import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieForm } from 'src/app/models/add-movie-form';
import { APIResponse } from 'src/app/models/api-response';
import { CustomError } from 'src/app/models/custom-error';
import { GetMovieBy, Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  GetMovieBy = GetMovieBy;
  constructor(
    private movieService: MovieService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  addMovieForm: FormGroup = this.fb.group({
    addByName: [GetMovieBy.Name, Validators.required],
    movieInput: ['', Validators.required]
  });

  onAddMovie(): void {
    const addMovieFormData: AddMovieForm = this.addMovieForm.value;
    this.movieService.getMovieInfoRequest(addMovieFormData).subscribe({
      next: (movieData: Movie) => {
        if (movieData.Response === 'True') {
          const getMovieBy: string = addMovieFormData.getMovieBy;
          if (getMovieBy === GetMovieBy.Name) {
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
    this.movieService.addMovieRequest(data).subscribe({
      next: (data: APIResponse) => {
        this.snackbarService.success(data.message, 'Ok');
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, 'Ok')
      }
    })
  }
}
