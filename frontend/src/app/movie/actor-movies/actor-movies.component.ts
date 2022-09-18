import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-actor-movies',
  templateUrl: './actor-movies.component.html',
  styleUrls: ['./actor-movies.component.css']
})
export class ActorMoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  listTypeMovies: Movie[] = [];
  listType: string = '';
  listId: string = '';

  getListTypeMovies(listType: string, listId: string): void {
    this.movieService.getListMovies(listType, listId).subscribe((data) => {
      this.listTypeMovies = data.data;
    })
  }

  ngOnInit(): void {
    this.listType = this.route.snapshot.params['type'];
    this.listId = this.route.snapshot.params['id'];

    this.getListTypeMovies(this.listType, this.listId);
  }

}
