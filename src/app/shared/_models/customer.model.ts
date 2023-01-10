export class Customer {
  customerID: string;
  min_meter: number;
  max_meter:number;
  address: string;
  enabled:boolean


  constructor(customerID: string, min_meter: number, max_meter: number, address: string, enabled: boolean) {
    this.customerID = customerID;
    this.min_meter = min_meter;
    this.max_meter = max_meter;
    this.address = address;
    this.enabled = enabled;
  }
}
