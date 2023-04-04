import { Component} from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { UserCollectionMovie } from '../interfaces/userCollectionMovie';
import { UserCollectionDTO } from '../interfaces/userCollectionDTO';
import {MatDialog} from '@angular/material/dialog';
import { RateDialog } from "../rate-dialog/rate-dialog";





@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  movies!: UserCollectionMovie [];
  errorMessage: string = '';
  searchText: string = '';

  constructor(private moviesService: MoviesService, private router: Router, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.moviesService.getCollection().subscribe({
      next: (response) => {
        this.movies = response
      },
      error: () => {
        this.router.navigate(["page-not-found"]);
      }
    });
  }


  delete(movie: UserCollectionMovie): void {
    this.moviesService.deleteCollection(movie.movie.title).subscribe({
      next: () => {
        let id = this.movies.indexOf(movie)
        this.movies.splice(id, 1)
      } 
    })
  }

  edit(movie: UserCollectionMovie): void {
    
    const dialogRef = this.dialog.open(RateDialog, {
      data: {rate: movie.rate},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined){result = movie.rate}
      const movieSend: UserCollectionDTO = {title: movie.movie.title, rate: result}
      this.moviesService.editCollection(movieSend).subscribe({
        next: () => {
          let id = this.movies.indexOf(movie)
          this.movies[id].rate = result;
        } 
      })
    });

  }

  logOut(): void {
    document.cookie = "X-Access-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate(['']);
  }
  goMain(): void {
    this.router.navigate(['homepage']);
  }
}



