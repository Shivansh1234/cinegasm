import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsLibModule } from 'material-components-lib';

import { MovieRoutingModule } from './movie-routing.module';

// Component imports
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { TypeMoviesComponent } from './type-movies/type-movies.component';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MaterialComponentsLibModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatToolbarModule
  ]
})
export class MovieModule { }
