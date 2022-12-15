export class Voorraad {
  private _id: number;
  private _leftoverId: number;
  private _userID: number;
  private _enabled: boolean;
  private _dateProcessed: number;


  constructor(leftoverId: number, userID: number, enabled: boolean, dateProcessed: number) {
    this._leftoverId = leftoverId;
    this._userID = userID;
    this._enabled = enabled;
    this._dateProcessed = dateProcessed;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get leftoverId(): number {
    return this._leftoverId;
  }

  set leftoverId(value: number) {
    this._leftoverId = value;
  }

  get userId(): number {
    return this._userID;
  }

  set userId(value: number) {
    this._userID = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get dateProcessed(): number {
    return this._dateProcessed;
  }

  set dateProcessed(value: number) {
    this._dateProcessed = value;
  }
}
