import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieRoutingModule } from './movie-routing.module';

// Component imports
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddMovieDialogComponent } from './add-movie/add-movie-dialog/add-movie-dialog.component';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TypeMoviesComponent } from './type-movies/type-movies.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    AddMovieComponent,
    AddMovieDialogComponent,
    TypeMoviesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieRoutingModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule
  ]
})
export class MovieModule { }
