import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "./order.model";
import {User} from "../shared/_models/user.model"
import {Article} from "../shared/_models/article.model";


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
    return this.http.put(environment.apiUrl + '/api/orders/', order);
  }
  getCutWaste(cutWasteID: number): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/cutWaste/id/' + cutWasteID);
  }
  getUser(userID: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/api/users/id/' + userID);
  }

  getArticleById(articleID: String): Observable<Article> {
    console.log("hihi")
    return this.http.get<Article>(environment.apiUrl + '/api/article/' + articleID )
  }

}

