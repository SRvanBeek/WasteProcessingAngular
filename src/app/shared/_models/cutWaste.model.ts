export class cutWaste{
  artikelnummer: String;
  dateCut: String;
  gewicht: number;
  id: number;
  metrage: number;
  processed: boolean;
  type: String;


  constructor(artikelnummer: String, dateCut: String, gewicht: number, id: number, metrage: number, processed: boolean, type: String) {
    this.artikelnummer = artikelnummer;
    this.dateCut = dateCut;
    this.gewicht = gewicht;
    this.id = id;
    this.metrage = metrage;
    this.processed = processed;
    this.type = type;
  }
}
