export class Order {
  id: number;
  cutWasteID: number;
  enabled: boolean;
  userId: number;
  dateProcessed: number;

  constructor(id: number, cutWasteID: number, dateProcessed: number, userId: number, enabled: boolean) {
    this.id = id;
    this.cutWasteID = cutWasteID;
    this.enabled = enabled;
    this.userId = userId;
    this.dateProcessed = dateProcessed;
  }


}
