import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getOneUser(username: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/api/users/' + username);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/users/');
  }

  checkUsername(username: String): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/checkUsername', username)
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/save', user);
  }

  putUser(user: User): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/api/users/', user);
  }

  registerAdmin(user: User) {
    return this.http.post<any>(environment.apiUrl + '/api/users/admins/save', user);
  }
}
