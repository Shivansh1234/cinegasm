import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeMoviesComponent } from './type-movies/type-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  { path: 'add', component: AddMovieComponent },
  { path: 'list', component: MovieListComponent },
  { path: ':type/:id', component: TypeMoviesComponent },
  { path: '', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
