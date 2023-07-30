import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeMoviesComponent } from './components/type-movies/type-movies.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':imdbId', component: MovieDetailComponent},
  { path: ':type/:id', component: TypeMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
