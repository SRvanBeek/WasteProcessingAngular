import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Article} from "../_models/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiUrl + '/api/articles');
  }

  getOneArticle(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/articles/' + id);
  }

  getCustomerByArticle(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/articles/byArticleId/' + id);
  }
}
