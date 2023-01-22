import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Customer} from "../_models/customer.model";

/**
 * @Author Roy van Delft & Dino Yang
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches the customer data, based on the ID of the currently selected leftover, if the leftover is of the type 'order'
   * @param id the ID of the selected leftover
   */
  getCustomerByLeftoverID(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/orders/customer/" + id);
  }

  putCustomer(customer: Customer): Observable<any> {
    return this.http.put<any>(environment.apiUrl + "/api/customers", customer);
  }

  postCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/api/customers", customer);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/customers");
  }

  customerExists(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/customers/exist/" + id);
  }
}


