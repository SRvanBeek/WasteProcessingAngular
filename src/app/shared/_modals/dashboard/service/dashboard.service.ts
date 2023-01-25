import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

/**
 * @author Stijn van Beek
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  /**
   * calls api to receive the total weight and metrage of all waste.
   */
  getTotalWaste(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/waste/details');
  }

  /**
   * calls api to receive the total weight and metrage of all waste in a given category.
   * @param category the given category to receive the details from.
   */
  getTotalWastePerCategory(category: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/waste/details/' + category);
  }

  /**
   * calls api to get the name of every category in the database.
   */
  getCategories(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/categories/names');
  }

  /**
   * calls api to get the total composition in a given category.
   * @param category the given category to receive the composition from.
   */
  getComposition(category: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/waste/composition/' + category);
  }
}
