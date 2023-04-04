import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import {MatDialog} from '@angular/material/dialog';
import { AddMovieDialog } from "../add-movie-dialog/add-movie-dialog";
import { RateDialog } from "../rate-dialog/rate-dialog";
import { UserCollectionDTO } from "../interfaces/userCollectionDTO";
import { UserCollectionMovie } from "../interfaces/userCollectionMovie";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage-loged',
  templateUrl: './homepage-loged.component.html',
  styleUrls: ['./homepage-loged.component.css']
})
export class HomepageLogedComponent {
  movies!: Movie[];
  moviesCollection!: UserCollectionMovie [];
  errorMessage: string = '';
  searchText: string = '';
  isAdmin: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    

    this.moviesService.getMovies().subscribe({
      next: (response) => {
        this.movies = response
      }
    });
    
    this.moviesService.getCollection().subscribe({
      next: (response) => {
        this.moviesCollection = response
      },
      error: () => {
        this.router.navigate([""]);
      }
    });

    this.isAdmin = this.moviesService.isAdmin();
  }

  logOut(): void {
    document.cookie = "X-Access-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['']);
  }
  goCollection(): void {
    this.router.navigate(['catalog']);
  }


  add(): void {

    const dialogRef = this.dialog.open(AddMovieDialog, {
      data: {add: true, movie: {}},
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.moviesService.addMovie(result).subscribe({
          next: () => {
            this.movies.push(result);
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }


  delete(movie: Movie): void {
    this.moviesService.deleteMovie(movie.title).subscribe({
      next: () => {
        let id = this.movies.indexOf(movie)
        this.movies.splice(id, 1)
      },
      error: (e) => {
        console.log(e);
      } 
    })
  }

  edit(movie: Movie): void {
    const dialogRef = this.dialog.open(AddMovieDialog, {
      data: {add: false, movie: movie},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.moviesService.editMovie(result).subscribe({
          next: () => {
            let id = this.movies.indexOf(movie)
            this.movies[id] = result;
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }

  addToCollection(title: string): void {
    const [thisMovieInCollection, ] = (this.moviesCollection.filter(obj => { return obj.movie.title === title}));

    if(thisMovieInCollection == undefined){
      const dialogRef = this.dialog.open(RateDialog, {
        data: {rate: 0},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          const movie: UserCollectionDTO = {title: title, rate: result}
          this.moviesService.addCollection(movie).subscribe({
          next: () => {
            this._snackBar.open(`${title} added to collection`, 'Close', {duration: 1500})
          },
          error: (e) => {
            console.log(e);
          }
        })}
      });
    }
    else{
      this._snackBar.open(`${title} is in collection with rate ${thisMovieInCollection.rate}`, 'Close', {duration: 1500})
    }

  }
}
