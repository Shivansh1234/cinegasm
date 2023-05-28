import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs/operators';
import { PageConfig, ColumnConfig, SelectionConfig } from 'material-components-lib';
import { Sort } from '@angular/material/sort';

import { APIResponse } from 'src/app/models/api-response';
import { CustomError } from 'src/app/models/custom-error';
import { Movie, MovieRes } from 'src/app/models/movie';
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

  // Table init
  movieColumns: ColumnConfig[] = [
    { name: 'Title', header: 'Title', type: 'string', sortable: true },
    { name: 'Year', header: 'Year', type: 'string', sortable: true },
    { name: 'Released', header: 'Released Date', type: 'string', sortable: false },
    { name: 'imdbRating', header: 'IMDb', type: 'string', sortable: true },
  ];
  expandableRowColumnName: string = 'Plot';

  // Pagination init
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalLength: number = 0;

  pageConfig: PageConfig = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  };

  sortConfig: Sort = {
    active: 'Title',
    direction: ''
  };

  // Searchbar form control
  movieSearch = new FormControl('');
  searchVal: string = '';

  constructor(
    private movieService: MovieService,
    private snackbarService: SnackbarService
  ) { }

  ngAfterViewInit(): void {
    this.movieSearch.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe((input: string) => {
      this.searchVal = input;
      this.pageConfig.pageIndex = 0;
      this.pageConfig.pageSize = 10;
      this.getMovies();
    });
    this.getMovies();
  }

  getMovies(): void {
    this.isLoading = true;
    this.movieService.getMovieList(this.sortConfig.active, this.sortConfig.direction, this.pageConfig.pageIndex + 1, this.pageConfig.pageSize, this.searchVal)
      .pipe(
        debounceTime(300),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (mappedData: MovieRes) => {
          this.movies = mappedData.data.movies;
          this.pageConfig.totalCount = mappedData.data.total;
        },
        error: (err: CustomError) => {
          this.snackbarService.error(err.message, 'Ok');
        }
      });
  }

  onSortChange(sortEvent: Sort): void {
    this.sortConfig = sortEvent;
    this.pageConfig.pageIndex = 0;
    this.getMovies();
  }

  onPageChange(pageEvent: PageConfig): void {
    this.pageConfig = pageEvent;
    this.getMovies();
  }

  onRowSelection(event: SelectionConfig): void {
    console.log(event);
  }

  onMovieDelete(imdbId: string): void {
    this.movieService.deleteMovie(imdbId)
      .subscribe({
        next: (deleteData: APIResponse) => {
          const index = this.movies.findIndex(m => m.imdbID === imdbId);
          this.movies.splice(index, 1);
          this.totalLength = this.totalLength - 1;
          // this.table.renderRows();
          this.snackbarService.success(deleteData.message, 'Ok');
        },
        error: (err: CustomError) => {
          this.snackbarService.error(err.message, 'Ok');
        }
      });
  }
}
