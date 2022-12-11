export class Article{
  artikelnummer: String;
  leverancier: String;
  productgroep: String;
  eancode: String;
  omschrijving: String;
  kleur: number;
  stofbreedte: number;
  patroonlengte: number;
  patroonbreedte: number;
  soort: String;
  opmaak: String;
  wascode: String;
  samenstelling: String;
  gewicht: number;
  niet_kantelbaar: String;
  stock_rl: String;
  min: number;


  constructor(artikelnummer: String, leverancier: String, productgroep: String, eancode: String, omschrijving: String, kleur: number, stofbreedte: number, patroonlengte: number, patroonbreedte: number, soort: String, opmaak: String, wascode: String, samenstelling: String, gewicht: number, niet_kantelbaar: String, stock_rl: String, min: number) {
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
    this.niet_kantelbaar = niet_kantelbaar;
    this.stock_rl = stock_rl;
    this.min = min;
  }
}
