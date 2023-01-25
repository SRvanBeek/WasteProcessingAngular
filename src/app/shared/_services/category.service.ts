import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryJSON} from "../_models/category-json.model";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private http: HttpClient) {
  }

  getCategoryNameById(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/categories/' + id);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/categories');
  }

  putCategory(category: CategoryJSON): Observable<any> {
    return this.http.put<string>(environment.apiUrl + '/api/categories/', category);
  }

  postCategory(categoryJson: CategoryJSON): Observable<any> {
    return this.http.post<string>(environment.apiUrl + '/api/categories', categoryJson);
  }
}
