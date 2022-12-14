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
    return this.http.get<Article[]>(environment.apiUrl + '/api/article');
  }

  getOneArticle(id: string): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + '/api/article/' + id);
  }
}
