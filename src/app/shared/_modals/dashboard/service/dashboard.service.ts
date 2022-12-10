import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../../../_models/category.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getTotalWaste(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/waste/details');
  }
  getTotalWastePerCategory(category: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/waste/details/' + category);
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/api/categories/names');
  }
  getComposition(category: string): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/api/waste/composition/' + category);
  }
}
