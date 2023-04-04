import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


import { UserCollectionMovie } from './interfaces/userCollectionMovie';
import { Movie } from './interfaces/movie';
import { User } from './interfaces/user';
import { UserCollectionDTO } from './interfaces/userCollectionDTO';
@Injectable({
    providedIn: 'root'
  })

export class MoviesService {

  constructor(private http: HttpClient) {  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`/user/login`, user);
  }
  register(user: User): Observable<string> {
    return this.http.post<string>(`/user/register`, user);
  }
  


  getMovies(): Observable<Movie []> {
    return this.http.get<Movie []>(`/movies`);
  }
  addMovie(movie: Movie): Observable<string> {
    return this.http.post<string>(`/movies/add`, movie, this.generateHeaders());
  }
  editMovie(movie: Movie): Observable<string> {
    return this.http.put<string>(`/movies/edit`, movie, this.generateHeaders());
  }
  deleteMovie(title: string): Observable<string> {
    return this.http.delete<string>(`/movies/delete/${title}`, this.generateHeaders());
  }



  getCollection(): Observable<UserCollectionMovie []> {
    return this.http.get<UserCollectionMovie []>(`/collection`, this.generateHeaders());
  }

  deleteCollection(title: string): Observable<string>{
    return this.http.delete<string>(`/collection/delete/${title}`, this.generateHeaders());
  }

  editCollection(movie: UserCollectionDTO): Observable<string>{
    return this.http.put<string>(`/collection/edit/`, movie, this.generateHeaders());
  }

  addCollection(movie: UserCollectionDTO): Observable<string>{
    return this.http.post<string>(`/collection/add/`, movie, this.generateHeaders());
  }


  generateHeaders() : object{
    let decodedCookie = this.getCookie("X-Access-Token")
    var headers = {headers: {"Authorization": `Bearer ${decodedCookie}`}}
    return headers
  }


  getCookie(cname: string): string {
    let name = cname + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  decodeJWT(token: string): string{
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    return decodedToken.role;
  }

  isAdmin(): boolean{
    const decodedCookie = this.getCookie("X-Access-Token");
    const decodedToken = this.decodeJWT(decodedCookie);
    if(decodedToken == "Administrator"){
      return true
    }
    return false
  }

}