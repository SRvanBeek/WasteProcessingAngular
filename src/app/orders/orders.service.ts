import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "./order.model";
import {Article} from "../shared/_models/article.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<any> {
    return this.http.get<any[]>(environment.apiUrl + '/api/orders/');
  }

  disableOrderByID(order: Order): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/orders/', order);
  }

  getArticleByOrderId(OrderId: number): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + '/api/orders/artikel/' + OrderId)
  }

}

