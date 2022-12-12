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

  getOneVoorraad(id: string): Observable<Voorraad> {
    return this.http.get<Voorraad>(environment.apiUrl + '/api/voorraad/' + id);
  }

  putVoorraad(voorraad: Voorraad): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/voorraad/', voorraad);
  }

  getOneVoorraadByCutWasteID(id: number): Observable<Voorraad> {
    return this.http.get<Voorraad>(environment.apiUrl + '/api/voorraad/' + id);
  }
}
