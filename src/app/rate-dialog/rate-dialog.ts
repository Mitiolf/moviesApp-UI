import { Component , Inject} from '@angular/core';


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'rate-dialog',
    templateUrl: 'rate-dialog.html',
    styleUrls: ['./rate-dialog.css']
  })
  export class RateDialog {
    constructor(
      public dialogRef: MatDialogRef<RateDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  
    rate: number = this.data.rate

    ngOnInit(): void {

      const stars = document.querySelectorAll(".stars i");

      stars.forEach((star, index2) => {
        this.rate - 1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      });

      stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
          //if star is doublecliked then unclick
          if(this.rate == index1 + 1){
            stars.forEach((star) => {star.classList.remove("active")})
            this.rate = 0
          }
          else{
            stars.forEach((star, index2) => {
              index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
              });
            this.rate = index1 + 1
          }
      });
    });
    }
      
    onNoClick(): void {
      this.dialogRef.close();
    }
    onClick(): void {
        this.dialogRef.close(this.rate);
    }
  }