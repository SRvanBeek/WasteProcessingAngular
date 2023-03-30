import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Leftover} from "../_models/leftover.model";

@Injectable({
  providedIn: 'root'
})
export class LeftoverService {

  constructor(private http: HttpClient) {
  }

  getAllLeftovers(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/leftover');
  }

  getAllLeftoversProcessed(processed: boolean): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/leftover/byProcessed/' + processed);
  }

  postLeftover(leftover: Leftover): Observable<Leftover> {
    return this.http.post<Leftover>(environment.apiUrl + '/api/leftover', leftover);
  }

  getAllByType(type: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/leftover/' + type);
  }

  setWasteDone(type: string, id: number) {
    return this.http.put<Leftover>(environment.apiUrl + '/api/leftover/done/' + id, type);
  }

  putLeftover(leftover: Leftover): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/leftover/', leftover);
  }

  getOneLeftover(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/leftover/id/' + id);
  }
  getLeftoverByCustomerId(id: String): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/leftover/customer/' + id);
  }
  putDisableLeftover(leftover: Leftover): Observable<string>{
    return this.http.put<string>(environment.apiUrl + '/api/leftover/disable', leftover)
  }
  putEnableLeftover(leftover: Leftover): Observable<string>{
    return this.http.put<string>(environment.apiUrl + '/api/leftover/enable', leftover)
  }
}
