import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Voorraad} from "../_models/voorraad";

@Injectable({
  providedIn: 'root'
})
export class VoorraadService {

  constructor(private http: HttpClient) {
  }

  getOneVoorraad(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/voorraad/' + id);
  }

  putVoorraad(voorraad: Voorraad): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/voorraad/', voorraad);
  }

  getOneVoorraadByLeftoverID(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/voorraad/' + id);
  }
}
