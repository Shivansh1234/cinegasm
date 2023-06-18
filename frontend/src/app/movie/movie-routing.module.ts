import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeMoviesComponent } from './type-movies/type-movies.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':type/:id', component: TypeMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
