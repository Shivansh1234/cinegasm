import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMovieBy, Movie } from 'src/app/models/movie';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<Movie> = new Observable<Movie>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovieInfo();
  }

  getMovieInfo(): void {
    const movieId: string = this.route.snapshot.paramMap.get('imdbId') as string;
    const getMovieBy: string = GetMovieBy.IMDbId;

    this.movie$ = this.movieService.getMovieInfoRequest({ movieInput: movieId, getMovieBy });
  }

}
