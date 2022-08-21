import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: 'add', component: AddMovieComponent},
  { path: 'list', component: MovieListComponent},
  { path: '', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
