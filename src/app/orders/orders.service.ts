import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<any> {
    let data = this.http.get<any[]>(environment.apiUrl + '/api/orders/');
    return data;

  }

}

