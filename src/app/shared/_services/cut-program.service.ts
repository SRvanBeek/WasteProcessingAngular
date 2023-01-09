import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CutProgramService {

  constructor(private http: HttpClient) {
  }

  addLeftover(articleNumber: string, metrage: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/generateLeftovers', {articleNumber, metrage})
  }

  addRandomLeftovers(amount: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/generateLeftovers/random/' + amount, {})
  }

}
