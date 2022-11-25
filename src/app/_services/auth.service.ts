import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {JwtToken} from "../_models/JwtToken";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<JwtToken | null>;
  public token: Observable<JwtToken | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('JwtToken')!));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue() {
    return this.tokenSubject;
  }

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        }
      )
    };
    let body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(environment.apiUrl+'/api/login', body, options)
      .pipe(map(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('JwtToken', JSON.stringify(token));
        this.tokenSubject.next(token);
        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('JwtToken');
    this.tokenSubject.next(null);
  }
}
