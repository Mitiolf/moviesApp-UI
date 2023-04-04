import { Component , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
    styleUrls: ['./login-dialog.css']
  })
  export class LoginDialog {
    userForm!: FormGroup;
    formError: string = '';
    doRegister: boolean = false;
  


    constructor(public dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private moviesService: MoviesService,) {}
        
    ngOnInit(): void {
        this.userForm = new FormGroup({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
          });
    }

    
    togleRegister(): void {
        this.formError = ""
        this.doRegister = this.doRegister ? false : true;
      }
      
      
      
    onNoClick(): void {
      this.dialogRef.close();
    }
    onClick(): void {

      if(this.userForm.valid){

        if(!this.doRegister){
          this.moviesService.login(this.userForm.value).subscribe({
            next: (response) => {
                this.router.navigate(['homepage']);
                this.dialogRef.close();
            },
            error: (e) => {
              this.formError = "Wrong password or username."
            }
          });
        }
        else{
          this.moviesService.register(this.userForm.value).subscribe({
            next: (response) => {
                this.router.navigate(['homepage']);
                this.dialogRef.close();
            },
            error: (e) => {
              this.formError = "User already exist."
            }
          });
        }
      }
    }

    getErrorMessageUsername() {
      if (this.userForm.controls['username'].hasError('required')) {
        return 'You must enter a username';
      }
      return '';
    }
    getErrorMessagePassword() {
      if (this.userForm.controls['password'].hasError('required')) {
        return 'You must enter a password';
      }
      return '';
    }

  }