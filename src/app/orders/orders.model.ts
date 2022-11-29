export class Orders {
  constructor(id: number, articleID: number, customerID: number, metrgage: number) {
    this.id = id;
    this.articleID = articleID;
    this.customerID = customerID;
    this.metrage = metrgage;

  }

  id: number;
  articleID: number;
  customerID: number;
  metrage: number;
}
