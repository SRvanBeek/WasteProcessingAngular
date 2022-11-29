import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Orders} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  getOrders(): Observable<any> {
    return this.http.get(environment.apiUrl+ '/api/orders/');

  }

}

