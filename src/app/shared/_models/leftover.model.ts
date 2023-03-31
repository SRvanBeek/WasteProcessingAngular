export class Leftover {

  id: number;
  artikelnummer: string;
  processed: boolean;
  metrage: number;
  gewicht: number;
  dateCut: number;
  type: string;
  private _disable: boolean;

  employee: string;
  customer: string;
  dateProc: string;

  constructor(artikelnummer: string, processed: boolean, metrage: number, gewicht: number, dateCut: number, type: string, disable: boolean) {
    this.artikelnummer = artikelnummer;
    this.processed = processed;
    this.metrage = metrage;
    this.gewicht = gewicht;
    this.dateCut = dateCut;
    this.type = type;
    this._disable = disable;
  }

}
