export class Order {
  constructor(id: number, artikelID: number, customerID: number, metrage: number) {
    this.id = id;
    this.artikelID = artikelID;
    this.customerID = customerID;
    this.metrage = metrage;
  }

  id: number;
  artikelID: number;
  customerID: number;
  metrage: number;
}
