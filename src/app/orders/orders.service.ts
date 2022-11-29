import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  getOrders(): Observable<string> {
    return this.http.get(environment.apiUrl+ '/api/orders/', {responseType: 'text'});
  }

}
