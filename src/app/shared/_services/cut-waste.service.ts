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

  setWasteDone(type: string, id: number) {
    return this.http.put<CutWaste>(environment.apiUrl + '/api/cutWaste/done/' + id, type);
  }

  putCutWaste(cutWaste: CutWaste): Observable<string> {
    return this.http.put<string>(environment.apiUrl + '/api/cutWaste/', cutWaste);
  }

  getOneCutWaste(id: number): Observable<CutWaste> {
    return this.http.get<CutWaste>(environment.apiUrl + '/api/cutWaste/id/' + id);
  }
}
