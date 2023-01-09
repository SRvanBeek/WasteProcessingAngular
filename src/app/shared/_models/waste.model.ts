export class Waste {

  id: number;
  private _leftoverId: number;
  private _userId: number;
  private _categoryId: number;
  private _enabled: boolean;
  private _dateProcessed: number;

  constructor(leftoverId: number, userId: number, categoryId: number, enabled: boolean, dateProcessed: number) {
    this._leftoverId = leftoverId;
    this._userId = userId;
    this._categoryId = categoryId;
    this._enabled = enabled;
    this._dateProcessed = dateProcessed;
  }


  get leftoverId(): number {
    return this._leftoverId;
  }

  set leftoverId(value: number) {
    this._leftoverId = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
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
