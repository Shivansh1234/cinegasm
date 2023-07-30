import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsLibModule } from 'material-components-lib';

import { MovieRoutingModule } from './movie-routing.module';

// Component imports
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { TypeMoviesComponent } from './components/type-movies/type-movies.component';
import { AddMovieDialogComponent } from './components/add-movie/add-movie-dialog/add-movie-dialog.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

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
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';


// Other
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    AddMovieComponent,
    AddMovieDialogComponent,
    TypeMoviesComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    MaterialComponentsLibModule,

    // Material
    MatButtonModule,
    MatCardModule,
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
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,

    // Other imports
    SharedModule
  ]
})
export class MovieModule { }
