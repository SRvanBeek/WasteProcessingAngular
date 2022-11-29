import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Order} from "../orders/order.model";

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private http: HttpClient) {
  }

  getSnijData(): Observable<string> {
    return this.http.get(environment.apiUrl + '/api/snij', {responseType: 'text'});
  }

  getWasteCategorieData(articleId: any): Observable<string> {
    return this.http.get(environment.apiUrl + '/api/waste/perArticle/' + articleId, {responseType: 'text'});
  }

  getOrderByArticleData(articleId: number): Observable<Order> {
    return this.http.get<Order>(environment.apiUrl + '/api/orders/perArticle/' + articleId);
  }
}
