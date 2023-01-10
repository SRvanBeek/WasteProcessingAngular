import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'api/orders/users/' + id)
  }
}
