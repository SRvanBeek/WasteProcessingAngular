export class Order {
  constructor(id: number, artikelID: number, customerID: number, metrage: number, visibility: boolean) {
    this.id = id;
    this.artikelID = artikelID;
    this.customerID = customerID;
    this.metrage = metrage;
    this.visibility = visibility;
  }

  id: number;
  artikelID: number;
  customerID: number;
  metrage: number;
  visibility: boolean;
}
