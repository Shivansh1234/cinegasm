# Cinegasm

* Cinegasm is a Full stack application which will provide the user experience to keep track of movie/series playlist.
* The application supports a sign up process to create a user account and post that, user can add movies to their profile as a watchlist.
* User will be able to search a movie based on Title/IMDb Id, and then add the movie/series to their playlist.
* All the saved movies will appear in a grid like fashion based on Angular Material. The grid is a resusable component based on a custom built angular library.

## Before You Begin
If you are new to begin, I recommend you reading about the gist of both end framweorks:
* Angular - Angular's [Official Guide](https://angular.io/docs/) is a great starting point. You can kickstart with the official [tour of heroes](https://angular.io/tutorial/tour-of-heroes) guide.
* Express.js - Basic understanding of Express.js framework is required including the use of controllers, routes and middlewares. Any beginners tutorial on youtube is enough to get started. For reference - [Official Guide](https://expressjs.com/en/guide/routing.html)


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Visual Studio Code - I recommend using [VSCode](https://code.visualstudio.com/download) to code this application further, But you can use any other Code editor of your choice.
* Node.js - Install [Node.js](https://nodejs.org/en), to get started with the use of npm (Node Package Manager) & Express.js framework.
* Angular - Install [Angular](https://angular.io/cli), followed by [Material](https://material.angular.io/guide/getting-started)

```bash
$ npm install -g @angular/cli
```

```bash
$ ng add @angular/material
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, proceed to install the dependencies. Run this command in frontend application folder from the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies required for the application to run.
* To update these packages later on, just run `npm update`

## Few Checks about API
* If you are using an API from a non billing account, please expect a muddy map with watermark (For development purposes only).
* You need to add API key in index.html file.

## Running Your Application

### Run your Angular server using npm:

```bash
$ ng serve
```

### Run your backend server usig npm:

```bash
$ nodemon
```

Your frontend application should run on port 4200 with the environment configuration, and the backed server will be running on port 3000. Open browser to [http://localhost:4200](http://localhost:4200)

---
THAT'S IT! YOUR APPLICATION SHOULD BE RUNNING NOW.
