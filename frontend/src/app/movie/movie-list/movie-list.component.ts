import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { merge, startWith } from 'rxjs';
import { debounceTime, finalize, map, switchMap } from 'rxjs/operators';
import { APIResponse } from 'src/app/models/api-response';
import { CustomError } from 'src/app/models/custom-error';
import { Movie } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/snackbar.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MovieListComponent implements AfterViewInit {
  movies: Movie[] = [];
  isLoading: boolean = true;

  dataSource: MatTableDataSource<Movie> = new MatTableDataSource(this.movies);

  // Table init
  displayedColumns: string[] = ['Index', 'Poster', 'Title', 'Director', 'Language', 'Genre', 'Year', 'Actors', 'Runtime', 'imdbRating', 'Delete'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Movie | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Movie>;
  @ViewChild(MatSort) sort!: MatSort;

  // Pagination init
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalLength: number = 0;

  // Searchbar form control
  movieSearch = new FormControl('');

  constructor(private movieService: MovieService, private snackbarService: SnackbarService) { }

  getMovies(): void {
    this.sort.sortChange.subscribe(() => { this.paginator.pageIndex = 0 });
    merge(this.sort.sortChange, this.paginator.page, this.movieSearch.valueChanges)
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(() => {
          return this.movieService.getMovieList(this.sort.active, this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize, this.movieSearch.value);
        }),
        map(movieData => {
          this.totalLength = movieData.data.total;
          return movieData.data.movies;
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (mappedData: Movie[]) => {
          this.dataSource.data = mappedData;
        },
        error: (err: CustomError) => {
          this.snackbarService.error(err.message, 'Ok');
        }
      });
  }

  onMovieDelete(imdbId: string): void {
    this.movieService.deleteMovie(imdbId).subscribe({
      next: (deleteData: APIResponse) => {
        const index = this.movies.findIndex(m => m.imdbID === imdbId);
        this.movies.splice(index, 1);
        this.totalLength = this.totalLength - 1;
        this.table.renderRows();
        this.snackbarService.success(deleteData.message, 'Ok');
      },
      error: (err: CustomError) => {
        this.snackbarService.error(err.message, 'Ok');
      }
    });
  }

  ngAfterViewInit(): void {
    this.getMovies();
  }
}
