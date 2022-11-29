import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private http: HttpClient) { }

  getSnijData(): Observable<string> {
    return this.http.get(environment.apiUrl+ '/api/snij', {responseType: 'text'});
  }

  getWasteCategorieData(articleId: any): Observable<string> {
    return this.http.get(environment.apiUrl+ '/api/waste/perArticle/' + articleId, {responseType: 'text'});
  }
  getOrderByArticleData(articleId: any): Observable<string> {
    return this.http.get(environment.apiUrl+ '/api/orders/perArticle/' + articleId, {responseType: 'text'});
  }
}
