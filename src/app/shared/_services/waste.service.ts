import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Waste} from "../_models/waste.model";

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private http: HttpClient) {
  }

  putWaste(waste: Waste): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/waste/', waste);
  }

  getOneWasteByLeftoverID(leftoverId: number): Observable<Waste> {
    return this.http.get<Waste>(environment.apiUrl + '/api/waste/perleftover/' + leftoverId);
  }
}
