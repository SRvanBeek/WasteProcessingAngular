export class Leftover {

  id: number;
  artikelnummer: string;
  processed: boolean;
  metrage: number;
  gewicht: number;
  dateCut: number;
  type: string;


  constructor(artikelnummer: string, processed: boolean, metrage: number, gewicht: number, dateCut: number, type: string) {
    this.artikelnummer = artikelnummer;
    this.processed = processed;
    this.metrage = metrage;
    this.gewicht = gewicht;
    this.dateCut = dateCut;
    this.type = type;
  }
}
