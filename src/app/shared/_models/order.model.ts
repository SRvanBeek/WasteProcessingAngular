export class Order {
  id: number;
  leftoverID: number;
  enabled: boolean;
  userId: number;
  dateProcessed: number;

  constructor(id: number, leftoverID: number, dateProcessed: number, userId: number, enabled: boolean) {
    this.id = id;
    this.leftoverID = leftoverID;
    this.enabled = enabled;
    this.userId = userId;
    this.dateProcessed = dateProcessed;
  }


}
