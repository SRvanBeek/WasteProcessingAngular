export class Order {
  constructor(id: number, cutwasteID: number, userId: number, enabled: boolean, dateProcessed: number) {
    this.id = id;
    this.cutwasteID = cutwasteID;
    this.userId = userId;
    this.enabled = enabled;
    this.dateProcessed = dateProcessed;
  }

  id: number;
  cutwasteID: number;
  userId: number;
  enabled: boolean;
  dateProcessed: number;
}
