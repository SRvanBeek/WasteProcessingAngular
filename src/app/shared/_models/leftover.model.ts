export class Leftover {

  id: number;
  artikelnummer: string;
  processed: boolean;
  metrage: number;
  gewicht: number;
  dateCut: number;
  type: string;
  private _disable: boolean;


  constructor(artikelnummer: string, processed: boolean, metrage: number, gewicht: number, dateCut: number, type: string, disable: boolean) {
    this.artikelnummer = artikelnummer;
    this.processed = processed;
    this.metrage = metrage;
    this.gewicht = gewicht;
    this.dateCut = dateCut;
    this.type = type;
    this._disable = disable;
  }

  get disable(): boolean {
    return this._disable;
  }

  set disable(value: boolean) {
    this._disable = value;
  }
}
