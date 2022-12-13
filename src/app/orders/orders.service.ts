import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "./order.model";
import {User} from "../shared/_models/user.model"
import {Article} from "../shared/_models/article.model";
import {Waste} from "../waste-processing/waste.model";
import {cutWaste} from "../shared/_models/cutWaste.model";


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
  getCutWaste(cutWasteID: number): Observable<cutWaste> {
    return this.http.get<cutWaste>(environment.apiUrl + '/api/cutWaste/id/' + cutWasteID);
  }
  getUser(userID: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/api/users/id/' + userID);
  }
  getArticleByOrderId(OrderId: number): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + '/api/orders/artikel/' + OrderId)
  }

}

