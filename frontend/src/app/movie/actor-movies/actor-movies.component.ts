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

  actorName: string = '';
  actorMovies: Movie[] = [];

  getActorMovies(actor: string): void {
    this.movieService.getActorMovies(actor).subscribe((data) => {
      console.log(data);
      this.actorMovies = data.data;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actorName = params['id'];
    });
    this.getActorMovies(this.actorName);
  }

}
