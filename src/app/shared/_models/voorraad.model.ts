export class voorraad{
  constructor(id: String, cutwasteID: number, userID: number, enabled: boolean, dateProcessed: number) {
    this.id = id;
    this.cutwasteID = cutwasteID;
    this.userID = userID;
    this.enabled = enabled;
    this.dateProcessed = dateProcessed;
  }

  id: String;
  cutwasteID: number;
  userID: number;
  enabled: boolean;
  dateProcessed: number;

}
