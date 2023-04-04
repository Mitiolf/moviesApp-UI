import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../interfaces/movie';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialog } from "../login-dialog/login-dialog";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  movies!: Movie[];
  errorMessage: string = '';
  searchText: string = '';
  
  constructor(private moviesService: MoviesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    

    this.moviesService.getMovies().subscribe({
      next: (response) => {
        this.movies = response
      }
    });

  }

  login(): void{
    const dialogRef = this.dialog.open(LoginDialog, {
      data: {login: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      });
  }

}
