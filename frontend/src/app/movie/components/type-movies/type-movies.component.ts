import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/movie/models/movie';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-type-movies',
  templateUrl: './type-movies.component.html',
  styleUrls: ['./type-movies.component.scss']
})
export class TypeMoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  listTypeMovies: Movie[] = [];
  listType: string = '';
  listId: string = '';

  getListTypeMovies(listType: string, listId: string): void {
    this.movieService.getListMoviesRequest(listType, listId).subscribe((data) => {
      this.listTypeMovies = data.data;
    });
  }

  ngOnInit(): void {
    this.listType = this.route.snapshot.params['type'];
    this.listId = this.route.snapshot.params['id'];

    this.getListTypeMovies(this.listType, this.listId);
  }

}
