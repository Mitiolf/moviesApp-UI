import { Component , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'add-movie-dialog',
    templateUrl: 'add-movie-dialog.html',
    styleUrls: ['./add-movie-dialog.css']
  })
  export class AddMovieDialog {
    movieForm!: FormGroup;
    formError: string = '';


    constructor(public dialogRef: MatDialogRef<AddMovieDialog>, @Inject(MAT_DIALOG_DATA) public data: any,) {}
        
    ngOnInit(): void {

        this.movieForm = new FormGroup({
          'title': new FormControl(this.data.movie.title, Validators.required),
          'director': new FormControl(this.data.movie.director, Validators.required),
          'description': new FormControl(this.data.movie.description, Validators.required),
        });
      }
    
    
      
    onNoClick(): void {
      this.dialogRef.close();
    }
    onClick(): void {

      if(this.movieForm.valid){
        this.dialogRef.close(this.movieForm.value);
      }
    }



    getErrorMessageTitle() {
      if (this.movieForm.controls['title'].hasError('required')) {
        return 'You must enter a title.';
      }
      return '';
    }
    getErrorMessageDirector() {
      if (this.movieForm.controls['director'].hasError('required')) {
        return 'You must enter a director.';
      }
      return '';
    }
    getErrorMessageDesc() {
      if (this.movieForm.controls['description'].hasError('required')) {
        return 'You must enter a description.';
      }
      return '';
    }

  }