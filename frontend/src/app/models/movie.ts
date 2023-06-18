import { APIResponse } from "./api-response";

export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string[];
    Writer: string[];
    Actors: string[];
    Plot: string;
    Language: string[];
    Country: string[];
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

interface Rating {
    Source: string;
    Value: string;
}

export interface MovieRes extends APIResponse {
    data: {
        movies: Movie[];
        pageSize: number;
        pageIndex: number;
        total: number;
    }
}

export interface AddMovieRes extends APIResponse {
    data: Movie;
}

export interface FailedMovieRes {
    Response: string;
    Error: string;
}
