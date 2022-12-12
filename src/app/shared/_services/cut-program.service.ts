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

  cutProgram(): Observable<String> {
    return this.http.get<String>(environment.apiUrl + '/api/snij/setup');
  }

}
