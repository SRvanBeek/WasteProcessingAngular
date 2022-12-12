import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategoryNameById(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/categories/' + id);
  }
}
