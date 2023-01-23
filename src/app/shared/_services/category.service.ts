import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../_models/category.model";
import {EditCategory} from "../_models/edit-category.model";

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

  putCategory(category: EditCategory): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/categories/', category);
  }

  postCategory(category: EditCategory): Observable<string> {
    return this.http.post<string>(environment.apiUrl + '/api/categories/', category);
  }
}
