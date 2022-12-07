import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CutWaste} from "../_models/cut-waste.model";

@Injectable({
  providedIn: 'root'
})
export class CutWasteService {

  constructor(private http: HttpClient) {
  }

  getAllCutWaste(): Observable<CutWaste[]> {
    return this.http.get<CutWaste[]>(environment.apiUrl + '/api/cutWaste');
  }

  postCutWaste(cutWaste: CutWaste): Observable<CutWaste> {
    return this.http.post<CutWaste>(environment.apiUrl + '/api/cutWaste', cutWaste);
  }

  getAllByType(type: string): Observable<CutWaste[]> {
    return this.http.get<CutWaste[]>(environment.apiUrl + '/api/cutWaste/' + type);
  }
}
