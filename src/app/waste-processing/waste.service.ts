import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Waste} from "./waste.model";
import {WasteProcessingComponent} from "./waste-processing.component";

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  private baseUrl = "http://localhost:8080/api/snij";

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl,{responseType:'String'});
  }

  test() {
    this.getData().subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
