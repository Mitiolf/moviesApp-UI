import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.cookie = "X-Access-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  goBack() {
    this.router.navigate(['']);
  }
}
