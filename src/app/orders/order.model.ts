export class Order {
  constructor(id: number, articleID: number, customerID: number, metrage: number) {
    this.id = id;
    this.articleID = articleID;
    this.customerID = customerID;
    this.metrage = metrage;
  }

  id: number;
  articleID: number;
  customerID: number;
  metrage: number;
}
