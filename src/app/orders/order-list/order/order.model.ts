export class Order {
  constructor(id: number, customerID: number, artikelID: number, metrage: number) {
    this.id = id;
    this.customerID = customerID;
    this.artikelID = artikelID;
    this.metrage = metrage;
  }

  id: number;
  customerID: number;
  artikelID: number;
  metrage: number;
}
