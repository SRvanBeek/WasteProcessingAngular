export class Article {
  artikelnummer: string;
  leverancier: string;
  productgroep: string;
  eancode: string;
  omschrijving: string;
  kleur: number;
  stofbreedte: number;
  patroonlengte: number;
  patroonbreedte: number;
  soort: string;
  opmaak: string;
  wascode: string;
  samenstelling: string;
  gewicht: number;
  nietkantelmaar: string;
  stockRl: string;
  min: number;


  constructor(artikelnummer: string, leverancier: string, productgroep: string, eancode: string, omschrijving: string, kleur: number, stofbreedte: number, patroonlengte: number, patroonbreedte: number, soort: string, opmaak: string, wascode: string, samenstelling: string, gewicht: number, nietkantelmaar: string, stockRl: string, min: number) {
    this.artikelnummer = artikelnummer;
    this.leverancier = leverancier;
    this.productgroep = productgroep;
    this.eancode = eancode;
    this.omschrijving = omschrijving;
    this.kleur = kleur;
    this.stofbreedte = stofbreedte;
    this.patroonlengte = patroonlengte;
    this.patroonbreedte = patroonbreedte;
    this.soort = soort;
    this.opmaak = opmaak;
    this.wascode = wascode;
    this.samenstelling = samenstelling;
    this.gewicht = gewicht;
    this.nietkantelmaar = nietkantelmaar;
    this.stockRl = stockRl;
    this.min = min;
  }
}
