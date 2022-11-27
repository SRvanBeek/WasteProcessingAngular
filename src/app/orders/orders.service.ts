import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = "http://localhost:8080/api/orders"
  constructor(private http: HttpClient) { }
  getData(): Observable<string[]> {
    return this.http.get<any>(this.baseUrl);
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
