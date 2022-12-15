import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Order} from "../_models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiUrl + '/api/orders/');
  }

  disableOrderByID(order: Order): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/orders/disable', order);
  }

  getOrderByLeftoverID(id: number): Observable<Order> {
    return this.http.get<Order>(environment.apiUrl + '/api/orders/perleftover/' + id)
  }

  putOrder(order: Order): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/orders/', order);
  }

}

