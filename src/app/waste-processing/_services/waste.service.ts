import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Waste} from "../waste.model";

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private http: HttpClient) {
  }

  getWasteCategorieData(articleId: any): Observable<Waste> {
    return this.http.get<Waste>(environment.apiUrl + '/api/waste/perArticle/' + articleId);
  }

}
