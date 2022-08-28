import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, startWith } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomError } from 'src/app/models/custom-error';
import { Movie, MovieRes } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements AfterViewInit {
  movies: Movie[] = [];

  // Table init
  displayedColumns: string[] = ['Title', 'Year', 'Actors', 'Runtime', 'imdbRating'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Pagination init
  pageSize: number = 2;
  totalLength: number = 0;

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  getMovies(): void {
    this.sort.sortChange.subscribe(() => { this.paginator.pageIndex = 0 });
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.movieService.getMovieList(this.sort.active, this.sort.direction, this.paginator.pageIndex + 1, this.pageSize);
        }),
        map(movieData => {
          this.totalLength = movieData.data.total;
          return movieData.data.movies;
        }),
      )
      .subscribe(data => {
        this.movies = data;
      });
  }

  ngAfterViewInit(): void {
    this.getMovies();
  }

}
