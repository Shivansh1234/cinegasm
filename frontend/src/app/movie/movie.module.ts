import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie/movie.component';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';


@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieRoutingModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MovieModule { }
