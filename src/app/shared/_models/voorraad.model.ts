export class voorraad{
  constructor(id: number, cutwasteID: number, userID: number, enabled: boolean, dateProcessed: number) {
    this.id = id;
    this.cutwasteID = cutwasteID;
    this.userID = userID;
    this.enabled = enabled;
    this.dateProcessed = dateProcessed;
  }

  id: number;
  cutwasteID: number;
  userID: number;
  enabled: boolean;
  dateProcessed: number;

}
