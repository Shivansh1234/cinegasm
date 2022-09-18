import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorMoviesComponent } from './actor-movies/actor-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  { path: 'add', component: AddMovieComponent },
  { path: 'list', component: MovieListComponent },
  { path: 'actor/:id', component: ActorMoviesComponent },
  { path: '', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
