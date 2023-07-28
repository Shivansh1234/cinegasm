import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs/operators';
import { PageConfig, ColumnConfig, SelectionConfig, ActionData, ActionConfig } from 'material-components-lib';
import { Sort } from '@angular/material/sort';

import { APIResponse } from 'src/app/models/api-response';
import { CustomError } from 'src/app/models/custom-error';
import { Movie, MovieListRes } from 'src/app/models/movie';
import { SnackbarService } from 'src/app/app-services/snackbar.service';
import { MovieService } from '../movie.service';
import { defaultPageSize, defaultPageOptions, defaultMovieSortColumn } from '../movie.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
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
  isPanelOpenState: boolean = false;

  // Table init
  movieColumns: ColumnConfig[] = [
    { name: 'Title', header: 'Title', type: 'string', sortable: true },
    { name: 'Year', header: 'Year', type: 'string', sortable: true },
    { name: 'Released', header: 'Released Date', type: 'string', sortable: false },
    { name: 'imdbRating', header: 'IMDb', type: 'string', sortable: true },
  ];
  movieActions: ActionConfig[] = [
    { name: 'info', title: 'More Info', icon: 'info', isGroupAction: false },
    { name: 'delete', title: 'Delete', icon: 'delete', isGroupAction: true }
  ];
  expandableRowColumnName: string = 'Plot';

  // Pagination init
  pageSize: number = defaultPageSize;
  pageSizeOptions: number[] = defaultPageOptions;
  totalLength: number = 0;

  pageConfig: PageConfig = {
    pageIndex: 0,
    pageSize: defaultPageSize,
    totalCount: 0
  };

  sortConfig: Sort = {
    active: defaultMovieSortColumn,
    direction: ''
  };

  // Searchbar form control
  movieSearch = new FormControl('', { nonNullable: true });
  searchVal: string = '';

  constructor(
    private movieService: MovieService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    this.movieSearch.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((input: string) => {
        this.searchVal = input;
        this.pageConfig.pageIndex = 0;
        this.pageConfig.pageSize = defaultPageSize;
        this.getMovies();
      });
    this.getMovies();
  }

  getMovies(): void {
    this.isLoading = true;
    this.movieService.getMovieListRequest(this.sortConfig.active, this.sortConfig.direction, this.pageConfig.pageIndex + 1, this.pageConfig.pageSize, this.searchVal)
      .pipe(
        debounceTime(300),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (mappedData: MovieListRes) => {
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

  OnActionSelect(actionEvent: ActionData): void {
    if (actionEvent.name === 'info') {
      this.goToMovieInfo(actionEvent.value[0].imdbID);
    }
  }

  onRowSelection(selectionEvent: SelectionConfig): void {
    console.log(selectionEvent);
  }


  // Actions
  onMovieDelete(imdbId: string): void {
    this.movieService.deleteMovieRequest(imdbId)
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

  goToMovieInfo(movieId: string): void {
    this.router.navigate([`${movieId}`], { relativeTo: this.route });
  }
}
