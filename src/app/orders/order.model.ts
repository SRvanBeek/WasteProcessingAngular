export class Order {
  constructor(id: String, cutwasteID: number, userID: number, visibility: boolean, dateprocessed: number) {
    this.id = id;
    this.cutwasteID = cutwasteID;
    this.userID = userID;
    this.visibility = visibility;
    this.dateprocessed = dateprocessed;
  }

  id: String;
  cutwasteID: number;
  userID: number;
  visibility: boolean;
  dateprocessed: number;
}
