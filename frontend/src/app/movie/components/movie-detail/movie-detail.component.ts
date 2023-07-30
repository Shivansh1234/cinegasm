import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movie/models/movie';
import { MovieService } from '../../movie.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<Movie> = new Observable<Movie>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovieInfo();
  }

  getMovieInfo(): void {
    const movieId: string = this.route.snapshot.paramMap.get('imdbId') as string;

    this.movie$ = this.movieService.getMovieDetailRequest(movieId)
      .pipe(
        map(movieRes => movieRes.data)
      );
  }

  getMoviesBy(type: string, id: string): void {
    this.router.navigate([`/movie/${type}`, `${id}`]);
  }

}
