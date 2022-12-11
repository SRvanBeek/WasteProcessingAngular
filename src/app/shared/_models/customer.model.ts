export class Customer{
  customerID: String;
  min_meter: number;
  max_meter: number;
  address: String;
  enabled: boolean;

  constructor(customerID: String, min_meter: number, max_meter: number, address: String, enabled: boolean) {
    this.customerID = customerID;
    this.min_meter = min_meter;
    this.max_meter = max_meter;
    this.address = address;
    this.enabled = enabled;
  }
}
